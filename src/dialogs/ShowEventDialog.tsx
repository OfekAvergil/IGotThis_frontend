import * as React from "react";
import { Divider, Text } from "react-native-paper";
import eventsStore, {  EventsDialogs, event } from "../stores/eventsStore";
import BasicDialog from "./BaseDialog";
import { FlatList, StyleSheet, View } from "react-native";

const ShowEventDialog = () => {
  const event: event | null = eventsStore.selectedEvent;
  if (!event) return null;
  return BasicDialog({
    title: event.title,
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <View>
              <Text
                style={{
                  color: "black",
                  textAlign: "left",
                  fontSize: 14,
                }}
              >
                from : {event.dateStart} at {event.startTime}
              </Text>
              <Text
                style={{
                  color: "black",
                  textAlign: "left",
                  fontSize: 14,
                }}
              >
                to : {event.dateEnd} at {event.endTime}
              </Text> 
              <Text>at: {event.location}</Text>
          </View>
          <Divider style={{borderColor:"black", marginVertical: 5}}/>
          <View> 
            <Text>
              {event.content}
            </Text>
          </View>
          <FlatList
            renderItem={({ item }) => <Text>{item.content}</Text>}
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
