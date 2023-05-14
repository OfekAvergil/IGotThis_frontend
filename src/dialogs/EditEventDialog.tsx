import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import eventsStore, { EventsDialogs } from "../stores/eventsStore";

const EditEventDialog = () => {
  const [title, setTitle] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [content, setContent] = React.useState("");

  return BasicDialog({
    title: "Edit Event",
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <TextInput
            label="title"
            value={title}
            onChangeText={(title) => setTitle(title)}
            style={styles.input}
          />
          <TextInput
            label="content"
            value={content}
            onChangeText={(content) => setContent(content)}
            multiline={true}
            numberOfLines={5}
            style={styles.inputArea}
          />
        </View>
      </View>
    ),
    isVisible: eventsStore.isDialogOpen(EventsDialogs.EditEventDialog),
    enableActions: true,
    onOk: () => {
      console.log("ok");
      eventsStore.closeAllDialogs();
      eventsStore.editEvent();
    },
    onCancle: () => {
      console.log("cancle");
      eventsStore.closeAllDialogs();
    },
    onDismiss: () => {
      eventsStore.closeAllDialogs();
    },
  });
};

export default EditEventDialog;

const styles = StyleSheet.create({
  dialogContent: {
    backgroundColor: "#fff",
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
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputArea: {
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
});
