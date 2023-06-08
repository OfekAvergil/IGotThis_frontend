import * as React from "react";
import { TextInput } from "react-native-paper";
import notesStore, { NotesDialogs } from "../stores/notesStore";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import Recorder from "../components/DialogRecorder";
import { Colors } from "../consts";

const EditNoteDialog = () => {
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

  function getRecording(record?:string|null): void{
    if(record)setRecording(record)
  }

  return BasicDialog({
    title: "Edit Note",
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
           <Recorder addNewRec= {getRecording}  existedRecord={recording}/>

        </View>
      </View>
    ),
    isVisible: notesStore.isDialogOpen(NotesDialogs.EditNoteDialog),
    enableActions: true,
    onOk: () => {
      console.log("ok");
      notesStore.closeAllDialogs();
      notesStore.editNote(notesStore.selectedNote?.id||-1 ,title, content, recording? recording: undefined);
      notesStore.setSelectedNote(null);
    },
    onCancle: () => {
      console.log("cancle");
      notesStore.closeAllDialogs();
      notesStore.setSelectedNote(null);
    },
    onDismiss: () => {
      notesStore.closeAllDialogs();
      notesStore.setSelectedNote(null);
    },
  });
};

export default EditNoteDialog;

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
    height: 50,
    borderColor: Colors.basicGrey,
    backgroundColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputArea: {
    height: 200,
    backgroundColor: Colors.basicGrey,
    borderColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
});
