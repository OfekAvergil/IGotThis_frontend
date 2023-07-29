import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView} from "react-native";
import { Calendar } from "react-native-calendars";
import eventsStore, { EventsDialogs, event } from "../stores/eventsStore";
import { Card, FAB } from "react-native-paper";
import userStore from "../stores/userStore";
import { Colors, Pages, Strings } from "../consts";
import PopUpMenu from "./PopUpMenu";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { runInAction } from "mobx";
import { getCurrentDate } from "../common";

const CalendarEvents = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  React.useEffect(() => {
    if (userStore.secretKey) {
      eventsStore.fetchEvents(userStore.secretKey);
    }
  }, [userStore.secretKey]);

  const [selectedDay, setSelectedDay] = React.useState(
    new Date().toISOString().split("T")[0]
  );

  const handleDayPress = async (day: any) => {
    runInAction(() => {
      setSelectedDay(day.dateString);
      eventsStore.setSelectedDate(day.dateString);
    });
  };

  const renderItem = (item: event) => {
    return (
      <Card style={styles.listItem}>
        <TouchableOpacity
          onPress={() => {
            eventsStore.setSelectedEvent(item);
            eventsStore.openDialog(EventsDialogs.ShowEventDialog);
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={styles.time}
            >
              {item.startTime} -
            </Text>
            <Text
              style={styles.time}
            >
              {item.endTime}
            </Text>
          </View>
          <View
            style={{flex: 1, flexDirection: "row", alignItems: "center", margin: 2}}
          >
            <View
              style={{ flex: 2, flexDirection: "row", alignItems: "center" }}
            >
              <Text style={{ color: "white", fontSize: 22 }}>{item.title}</Text>
            </View>
            <View
              style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center",}}
            >
              <PopUpMenu
                menuItems={[
                  {
                    title: Strings.popup_menu_start_now_button,
                    action: () => {
                      eventsStore.setCurrentEvent(item.id);
                      navigate(Pages.GettingReady);
                    },
                    leadingIcon: "play",
                  },
                  {
                    title: Strings.popup_menu_edit_button,
                    action: () => {
                      eventsStore.setSelectedEvent(item);
                      eventsStore.openDialog(EventsDialogs.EditEventDialog);
                    },
                    leadingIcon: "lead-pencil",
                  },
                  {
                    title: Strings.popup_menu_delete_button,
                    action: () => {
                      eventsStore.deleteEvent(item.id);
                    },
                    leadingIcon: "delete",
                  },
                ]}
              />
            </View>
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
        contentContainerStyle={{ flexGrow: 1 }}
      />
    );
  };

  const markedAndSelected: { [date: string]: any } = {};

  // add single-day events to the marked dates object
  const eventsOneDay = eventsStore.getEventsDateListWithoutRange();
  eventsOneDay.forEach((date) => {
    // TODO!!!
    if (date === selectedDay) {
      markedAndSelected[date] = {
        selected: true,
        marked: true,
        dotColor: Colors.secondery,
      };
    } else {
      markedAndSelected[date] = { marked: true, dotColor: Colors.primary };
    }
  });

  // add range-of-days events to the marked dates object
  const eventRangeDates = eventsStore.getEventsDateListWithRange();
  eventRangeDates.forEach((event) => {
    const [dateStart, dateEnd] = event;
    const range = { color: Colors.secondery, textColor: "white" };
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
      color: Colors.primary,
      textColor: "white",
    },
  };

  return (
    <ScrollView>
      <Calendar
        current={getCurrentDate()}
        items={eventsStore.events}
        onDayPress={handleDayPress}
        markingType="period"
        markedDates={markedAndSelected}
        theme={{
          backgroundColor: Colors.background,
          calendarBackground: Colors.background,
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
    </ScrollView>
  );
};

export default CalendarEvents;

const styles = StyleSheet.create({
  container: {
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
    top: 280,
    backgroundColor: Colors.pink,
    borderRadius: 50,
  },
  listItem: {
    backgroundColor: Colors.secondery,
    minHeight: 70,
    height: "auto",
    margin: 10,
    padding: 20,
    textAlignVertical: "center",
  },
  time:{
    color: Colors.basicGrey,
    textAlign: "left",
    fontSize: 14,
  },
});
