import * as React from 'react';
import { Button, Dialog, TextInput } from 'react-native-paper';
import notesStore from '../stores/notesStore';
import BasicDialog from './BaseDialog';

const AddNoteDialog = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  return (
    BasicDialog({
      title: 'New Note',
      content:
      <Dialog.Content>  
          <TextInput
            label="title"
            value={title}
            onChangeText={title => setTitle(title)}
          />
          <TextInput
            label="content"
            value={content}
            onChangeText={content => setContent(content)}
            multiline= {true}
            numberOfLines={5}
          />
          <Button icon="microphone" mode="contained" onPress={() => console.log('Pressed')}>
            Press me
          </Button>
      </Dialog.Content> ,
      isVisible: notesStore.isDialogVisible,
      onOk: ()=> {
        console.log("ok")
        notesStore.setVisible(false);
        notesStore.addNote(title, content);
      },
      onCancle: ()=> {
        console.log("cancle")
        notesStore.setVisible(false);
        setTitle("");
        setContent("");
      },
      onDismiss: () => {notesStore.setVisible(false)}
    })
  );
};

export default AddNoteDialog;