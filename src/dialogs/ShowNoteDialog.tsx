import * as React from "react";
import { Text } from "react-native-paper";
import notesStore, { NotesDialogs, note } from "../stores/notesStore";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";

const ShowNoteDialog = () => {
  const note: note | null = notesStore.selectedNote;
  if (!note)
    return null
  return BasicDialog({
    title: note.name,
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <Text>
            {note.content};
          </Text>
        </View>
      </View>
    ),
    isVisible: notesStore.isDialogOpen(NotesDialogs.ShowNoteDialog),
    enableActions: false,
    onDismiss: () =>{
      notesStore.closeAllDialogs();
    },
    editAction: () => {
      notesStore.closeAllDialogs();
      notesStore.openDialog(NotesDialogs.EditNoteDialog);
    }
  });
};

export default ShowNoteDialog;

const styles = StyleSheet.create({
  dialogContent: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  form: {
    marginBottom: 15
  }
});
