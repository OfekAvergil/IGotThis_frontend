import * as React from 'react';
import { Button, Dialog, Portal, Text, TextInput } from 'react-native-paper';

const MyComponent = () => {
  const [visible, setVisible] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");



  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
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
        <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
          Press me
        </Button>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => {
            console.log('Cancel');
            setVisible(false);
            }}>Cancel</Button>
          <Button onPress={() => {
            console.log('Ok');
            setVisible(false);
            }}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MyComponent;