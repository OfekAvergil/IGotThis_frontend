import * as React from "react";
import { Text } from "react-native-paper";
import eventsStore, { EventsDialogs, event } from "../stores/eventsStore";
import BasicDialog from "./BaseDialog";
import { FlatList, StyleSheet, View } from "react-native";

const ShowEventDialog = () => {
  const event: event | null = eventsStore.selectedEvent;
  console.log(event);
  if (!event) return null;
  return BasicDialog({
    title: event.title,
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <Text>{event.dateStart};</Text>
          <Text>{event.dateEnd};</Text>
          <Text>{event.startTime};</Text>
          <Text>{event.endTime};</Text>
          <Text>{event.content};</Text>
          <FlatList
            renderItem={({ item }) => <Text>{item}</Text>}
            data={event.tasks}
          />
        </View>
      </View>
    ),
    isVisible: eventsStore.isDialogOpen(EventsDialogs.ShowEventDialog),
    enableActions: false,
    onDismiss: () => {
      eventsStore.closeAllDialogs();
    },
    editAction: () => {
      eventsStore.closeAllDialogs();
      eventsStore.openDialog(EventsDialogs.EditEventDialog);
    },
  });
};

export default ShowEventDialog;

const styles = StyleSheet.create({
  dialogContent: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  form: {
    marginBottom: 15,
  },
});
