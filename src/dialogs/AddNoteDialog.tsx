import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import notesStore from "../stores/notesStore";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";

const AddNoteDialog = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

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
          <Button
            icon="microphone"
            mode="contained"
            onPress={() => console.log("Pressed")}
          >
            Press me
          </Button>
        </View>
      </View>
    ),
    isVisible: notesStore.isDialogVisible,
    onOk: () => {
      console.log("ok");
      notesStore.setVisible(false);
      notesStore.addNote(title, content);
    },
    onCancle: () => {
      console.log("cancle");
      notesStore.setVisible(false);
      setTitle("");
      setContent("");
    },
    onDismiss: () => {
      notesStore.setVisible(false);
    },
  });
};

export default AddNoteDialog;

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
