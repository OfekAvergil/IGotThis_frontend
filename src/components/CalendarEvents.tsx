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
import eventsStore, { event } from "../stores/eventsStore";
import { Button, Card, FAB } from "react-native-paper";

const CalendarEvents = () => {
  const [selectedDay, setSelectedDay] = React.useState(
    new Date().toISOString()
  );

  const handleDayPress = (day: any) => {
    setSelectedDay(day.dateString);
  };
  const renderItem = (item: event) => {
    return (
      <TouchableOpacity onPress={onEventPress} style={{ margin: 15 }}>
        <Card>
          <Card.Title title={item.title} />
          <Card.Content>
            <Text>{item.content}</Text>
            <Text>{item.date}</Text>
            <Text>{item.startTime}</Text>
            <Text>{item.endTime}</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEventsForSelectedDay = (day: string) => {
    if (day && eventsStore.events[day]) {
      return (
        <FlatList
          data={eventsStore.events[day]}
          renderItem={({ item }) => renderItem(item)}
          ListHeaderComponent={
            <View style={{ flex: 1, padding: 10, flexDirection: "row" }}>
              <Text style={{ flex: 1 }}> Your Events for: {selectedDay}</Text>
            </View>
          }
        />
      );
    } else {
      return (
        <View>
          <Text>No events for selected day</Text>
        </View>
      );
    }
  };
  const onEventPress = () => {};

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
          eventsStore.setVisible(true);
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
