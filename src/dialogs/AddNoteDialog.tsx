import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import notesStore, { NotesDialogs } from "../stores/notesStore";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import Recorder from "../components/DialogRecorder";
import { Audio } from "expo-av";

const AddNoteDialog = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [recording, setRecording] = React.useState< string|null>(null);

  function clearModal(): void{
    setTitle("");
    setContent("");
  }

  function getRecording(record?:string|null): void{
    if(record)setRecording(record)
  }

  return BasicDialog({
    title: "New Note",
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
          <Recorder addNewRec={getRecording}  />
        </View>
      </View>
    ),
    isVisible: notesStore.isDialogOpen(NotesDialogs.AddNoteDialog),
    enableActions: true,
    onOk: () => {
      console.log("ok");
      notesStore.closeAllDialogs();
      notesStore.addNote(title, content, recording? recording: undefined);
      clearModal()
    },
    onCancle: () => {
      console.log("cancle");
      notesStore.closeAllDialogs();
      clearModal()
    },
    onDismiss: () => {
      notesStore.closeAllDialogs();
      clearModal()    
    },
  });
};

export default AddNoteDialog;

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
