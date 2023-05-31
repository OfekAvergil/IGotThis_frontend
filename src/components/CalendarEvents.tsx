import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Calendar } from "react-native-calendars";
import eventsStore, { EventsDialogs, event } from "../stores/eventsStore";
import { Card, FAB, Menu } from "react-native-paper";
import userStore from "../stores/userStore";
import { handleExtractTasks, handleSpeechToText } from "../api/OpenaiAPI";
import { Colors } from "../consts";
import PopUpMenu from "./PopUpMenu";

const CalendarEvents = () => {
  React.useEffect(() => {
    // This code will run after the component has been rendered to the screen
    // You can perform initialization tasks or fetch data from an API here
    if (userStore.secretKey) {
      eventsStore.fetchEvents(userStore.secretKey);
    }
  }, [userStore.secretKey]);

  const [selectedDay, setSelectedDay] = React.useState(
    new Date().toISOString().split("T")[0]
  );

  const [pathToAudioFile, setPathToAudioFile] = React.useState(
    "C:\\Users\\reutd\\Desktop\\IGotThis\\audioSample.mp3"
  );

  const [text, setText] = React.useState(
    "Hey Reut, how are you today? I hope you are doing well. I have a task for you: please send me the report by the end of the day. Thanks! Also don't forget to call me at 050-1234567. Bye!"
  );

  const handleDayPress = async (day: any) => {
    setSelectedDay(day.dateString);
    eventsStore.setSelectedDate(day.dateString);
    //handleExtractTasks();
    //handleSpeechToText(pathToAudioFile);
  };
  const renderItem = (item: event) => {
    return (
        <Card style={styles.listItem}>
          <TouchableOpacity
            onPress={() => {
              eventsStore.setSelectedEvent(item);
              eventsStore.openDialog(EventsDialogs.ShowEventDialog);
            }}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", margin: 2 }}>
              <View style={{ flex: 2, flexDirection: "row", alignItems: "center"}}>
                <Text style={{ color: "white", fontSize: 22 }}>{item.title}</Text>
              </View>
              <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                <PopUpMenu 
                menuItems={
                  <>
                    <Menu.Item
                      onPress={() => {
                        // ???
                        eventsStore.setSelectedEvent(item);
                        eventsStore.openDialog(EventsDialogs.EditEventDialog);
                        // close pop up menu
                      }}
                      title="Edit"
                      leadingIcon="lead-pencil"
                    />
                    <Menu.Item
                      onPress={() => eventsStore.deleteEvent(item.id)}
                      title="Delete"
                      leadingIcon="delete"
                    />
                  </>
                }
              />
            </View>
          </View>

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: Colors.basicGrey,
                textAlign: "left",
                fontSize: 14,
              }}
            >
              from : {item.dateStart} at {item.startTime}
            </Text>
            <Text
              style={{
                color: Colors.basicGrey,
                textAlign: "left",
                fontSize: 14,
              }}
            >
              to : {item.dateEnd} at {item.endTime}
            </Text>
            
          </View>
        </TouchableOpacity>
      </Card>
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
    const date: Date = new Date();
    const current: string = date.toISOString().split("T")[0];
    eventsStore.setSelectedDate(current);
    return current;
  };

  const markedAndSelected: { [date: string]: any } = {};

  // add single-day events to the marked dates object
  const eventsOneDay = eventsStore.getEventsDateListWithoutRange();
  eventsOneDay.forEach((date) => {
    // TODO!!!
    if (date === selectedDay) {
      markedAndSelected[date] = { selected: true, marked:true, dotColor: "blue" };
    } else {
      markedAndSelected[date] = { marked: true, dotColor: "#E5517E" };
    }
  });

  // add range-of-days events to the marked dates object
  const eventRangeDates = eventsStore.getEventsDateListWithRange();
  eventRangeDates.forEach((event) => {
    const [dateStart, dateEnd] = event;
    const range = { color: "blue", textColor: "white" };
    markedAndSelected[dateStart] = { startingDay: true, ...range };
    // mark all the days in the range
    let currentDay = new Date(dateStart);
    currentDay.setDate(currentDay.getDate() + 1);
    while (currentDay < new Date(dateEnd)) {
      const formattedDate = currentDay.toISOString().slice(0, 10);
      if (formattedDate !== dateStart && formattedDate !== dateEnd) {
        markedAndSelected[formattedDate] = { ...range };
      }
      currentDay.setDate(currentDay.getDate() + 1);
    }
    markedAndSelected[dateEnd] = { endingDay: true, ...range };
  });

  // selected day:
  markedAndSelected[selectedDay] = {
    ...{
      startingDay: true,
      endingDay: true,
      color: "#E5517E",
      textColor: "white",
    },
  };

  return (
    <View>
      <Calendar
        current={getCurrentDate()}
        items={eventsStore.events}
        onDayPress={handleDayPress}
        markingType="period"
        markedDates={markedAndSelected}
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: Colors.primary,
          selectedDayTextColor: "#ffffff",
          todayTextColor: Colors.primary,
          dayTextColor: "#2d4150",
          textDisabledColor: Colors.basicGrey,
        }}
        hideArrows={false}
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
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  addButton: {
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
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  listItem: {
    backgroundColor: Colors.secondary,
    minHeight: 130,
    height: "auto",
    margin: 10,
    padding: 20,
    textAlignVertical: "center",
  },
});
