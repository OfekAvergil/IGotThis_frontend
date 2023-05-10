import * as React from "react";
import { Text } from "react-native-paper";
import notesStore, { NotesDialogs, note } from "../stores/notesStore";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import DialogPlayer from "../components/DialogPlayer";

const ShowNoteDialog = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [recording, setRecording] = React.useState< string|null|undefined>(null);
  
  React.useEffect(()=>{
    if(notesStore.selectedNote){
      setTitle(notesStore.selectedNote?.name)
      setContent(notesStore.selectedNote.content)
      setRecording(notesStore.selectedNote.audio)
    }
  }, [notesStore.selectedNote])

  return BasicDialog({
    title: title,
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <Text>
            {content}
          </Text>
          <DialogPlayer recording={recording}/>
        </View>
      </View>
    ),
    isVisible: notesStore.isDialogOpen(NotesDialogs.ShowNoteDialog),
    enableActions: false,
    onDismiss: () =>{
      notesStore.closeAllDialogs();      
      notesStore.setSelectedNote(null);
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
