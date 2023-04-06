import * as React from "react";
import { View, Text, StyleSheet, Button} from "react-native";
import notesStore from "../stores/notesStore";

function NotesItems() {
  return(
    <>
      {notesStore.notes.map((note: {name: string, content: string}) => (
        <View style={styles.container}>
          <Text>{note.name}</Text>
          <Text>{note.content}</Text>
          <Button title="delete"/>
       </View> 
      ))}
    </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 20,
    backgroundColor: "#ccc",
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

export default NotesItems;