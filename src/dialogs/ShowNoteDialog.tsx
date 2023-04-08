import * as React from "react";
import { Text } from "react-native-paper";
import notesStore from "../stores/notesStore";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";

const ShowNoteDialog = () => {

  return BasicDialog({
    title: notesStore.selectedNote.name,
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <Text>
            {notesStore.selectedNote.content};
          </Text>
        </View>
      </View>
    ),
    isVisible: notesStore.isNoteOpen,
    enableActions: false,
    onDismiss: () =>{
      notesStore.setVisible(false);
    }
  });
};

export default ShowNoteDialog;

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
