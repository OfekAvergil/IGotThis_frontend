import * as React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import notesStore from "../stores/notesStore";
import { Header } from "react-native/Libraries/NewAppScreen";
import { observer } from "mobx-react";

function NotesItems() {
  return(
    <>
      {notesStore.notes.map((note: {name: string, content: string}) => (
        <View>
          <Text>{note.name}</Text>
          <Text>{note.content}</Text>
          <Button title="delete"/>
       </View> 
      ))}
    </>
  );
}

const ObservedNotesList = observer(NotesItems)


function NotesList() {
  return (
    <>
      <Header>Notes List</Header>
      <ObservedNotesList/>
      <Button title="Open form dialog "/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});

export default NotesList;