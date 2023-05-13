import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import eventsStore, { EventsDialogs, event } from "../stores/eventsStore";
import { Button, Card, FAB } from "react-native-paper";
import userStore from "../stores/userStore";

const CalendarEvents = () => {
  React.useEffect(() => {
    // This code will run after the component has been rendered to the screen
    // You can perform initialization tasks or fetch data from an API here
    if (userStore.secretKey) {
      eventsStore.fetchEvents(userStore.secretKey);
    }
  }, [userStore.secretKey]);

  const [selectedDay, setSelectedDay] = React.useState(
    new Date().toISOString()
  );

  const handleDayPress = (day: any) => {
    setSelectedDay(day.dateString);
  };
  const renderItem = (item: event) => {
    return (
      <TouchableOpacity
        onPress={() => {
          eventsStore.setSelectedEvent(item);
          eventsStore.openDialog(EventsDialogs.ShowEventDialog);         
        }}
        style={{ margin: 15 }}
      >
        <Card>
          <Card.Title title={item.title} />
          <Card.Content>
            <Text>{item.content}</Text>
            <Text>{item.dateStart}</Text>
            <Text>{item.dateEnd}</Text>
            <Text>{item.startTime}</Text>
            <Text>{item.endTime}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEventsForSelectedDay = (day: string) => {
    // convert day to be only date string
    const dayDate = day.split("T")[0];
    return (
      <FlatList
        data={eventsStore.getEventsByDate(dayDate)}
        renderItem={({ item }) => renderItem(item)}
        ListHeaderComponent={
          <View style={{ flex: 1, padding: 10, flexDirection: "row" }}>
            <Text style={{ flex: 1 }}> Your Events for: {selectedDay}</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={{ flex: 1, padding: 10, flexDirection: "row" }}>
            <Text style={{ flex: 1 }}>No events for this day</Text>
          </View>
        }
      />
    );
  };

  const getCurrentDate = () => {
    const date = new Date();
    return date.toISOString().split("T")[0];
  };

  const eventsDates = eventsStore.getEventsDateList();
  const marked = {
    [selectedDay]: { selected: true, selectedColor: "#E5517E" },
    // list of eventsDates with marked: true
    ...eventsDates.reduce<{
      [key: string]: { marked: boolean; dotColor: string };
    }>((acc, curr) => {
      acc[curr] = { marked: true, dotColor: "#E5517E" };
      return acc;
    }, {}),
  };
  console.log(marked);
  return (
    <View>
      <Calendar
        current={getCurrentDate()}
        items={eventsStore.events}
        onDayPress={handleDayPress}
        markedDates={marked}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#E5517E",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#E5517E",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9",
        }}
      />
      {selectedDay && renderEventsForSelectedDay(selectedDay)}
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => {
          eventsStore.openDialog(EventsDialogs.AddEventDialog);
        }}
      />
    </View>
  );
};

export default CalendarEvents;

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //justifyContent: "flex-end",
    marginBottom: 16,
  },
  item: {
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
