import * as React from "react";
import { Button, TextInput, Text } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { Platform, StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import eventsStore, { EventsDialogs } from "../stores/eventsStore";
import todosStore from "../stores/todosStore";
import { Colors } from "../consts";

interface settingsProps {
  selectedOption: string;
}

const SettingsDialog = (props: settingsProps) => {


  return BasicDialog({
    title: props.selectedOption,
    content: (
      // Render different content based on the selected option 
      {props.selectedOption === 'account' && ()}
    ),
    isVisible: eventsStore.isDialogOpen(EventsDialogs.AddEventDialog),
    enableActions: true,
    onOk: () => {
      eventsStore.closeAllDialogs();
      let notifyTimeFrame = "30";
      let newId = eventsStore.events.length + 1;
      eventsStore.addEvent(
        newId,
        title,
        dateStart,
        dateEnd,
        startTime,
        endTime,
        notifyTimeFrame,
        content
      );
      console.log(eventsStore.events);
      clearModal();
    },
    onCancle: () => {
      eventsStore.closeAllDialogs();
      clearModal();
    },
    onDismiss: () => {
      eventsStore.closeAllDialogs();
    },
  });
};

export default SettingsDialog;

const styles = StyleSheet.create({
  dialogContent: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  form: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputArea: {
    height: 200,
    borderColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
  smallInput: {
    height: 40,
    width: 150,
    borderColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 20,
    marginBottom: 10,
  },
});
