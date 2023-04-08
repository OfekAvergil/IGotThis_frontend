import * as React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import NotesList from "../../components/NotesList";
import AddNoteDialog from "../../dialogs/AddNoteDialog";

export default function NotesScreen() {
  // const [notes, setNotes] = useState([]);
  // const [newNote, setNewNote] = useState("");

  // const renderItem = ({ item }) => (
  //   <View style={styles.item}>
  //     <Text>{item}</Text>
  //   </View>
  // );

  return (
    <>
      <NotesList />
      {/* <AddNoteDialog/> */}
    </>

    // <View style={styles.container}>
    //   <Button variant="outlined" title="Add new Note" onClick={handleClickOpen}>
    //   </Button>

    //   <observer>{()=>
    //     <FlatList
    //       data={notes}
    //       renderItem={renderItem}
    //       keyExtractor={(item, index) => index.toString()}
    //     />
    //   }

    //   </observer>
    // </View>
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
