import * as React from 'react';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';
import notesStore from '../stores/notesStore';

const AddNoteDialog = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const hideDialog = () => notesStore.setVisible(false);

  return (
    <Portal>
      <Dialog visible={notesStore.isDialogVisible} onDismiss={hideDialog}>
      <Dialog.Title>New Note</Dialog.Title>
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
        />
        <Button icon="microphone" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => {
            console.log('Cancel');
            notesStore.setVisible(false);
            setTitle("");
            setContent("");
            }}>Cancel</Button>
          <Button onPress={() => {
            console.log('Ok');
            notesStore.setVisible(false);
            notesStore.addNote(title);
            }}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AddNoteDialog;