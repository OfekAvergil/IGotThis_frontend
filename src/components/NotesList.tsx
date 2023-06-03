import * as React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button,  Card,  Menu } from "react-native-paper";
import notesStore, { NotesDialogs, note } from "../stores/notesStore";
import noteStore from "../stores/notesStore";
import { useEffect } from "react";
import userStore from "../stores/userStore";
import { Colors } from "../consts";
import PopUpMenu from "./PopUpMenu";


export default function NotesList() {
  useEffect(() => {
    // This code will run after the component has been rendered to the screen
    console.log('userStore.secretKey' + userStore.secretKey)
    noteStore.fetchNotes(userStore.secretKey);

    return () => {
      // This cleanup function will run when the component is unmounted or when the dependencies change
      // You can perform cleanup tasks or cancel any ongoing operations here
    };
  }, []);

  const renderItem = (item: note) => {
    return (
      <Card style={styles.listItem}>
        <TouchableOpacity
          onPress={() => {
            notesStore.setSelectedNote(item);
            notesStore.openDialog(NotesDialogs.ShowNoteDialog);
          }}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", margin: 2 }}>
            <View style={{ flex: 3 }}>
              <Text style={{ color: "white", fontSize: 20 }}>{item.name}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
              <PopUpMenu 
              menuItems={
                <>
                  <Menu.Item onPress={() => {
                    notesStore.setSelectedNote(item);
                    notesStore.openDialog(NotesDialogs.EditNoteDialog);}} 
                    title="Edit" leadingIcon="lead-pencil"/>
                  <Menu.Item onPress={() => noteStore.deleteNote(item.id)} title="Delete" leadingIcon="delete"/>
                </>
              }
              />
            </View>
          </View>
          <View>
            <Text style={{ color: Colors.basicGrey, textAlign: "left", fontSize: 10 }}>
              {item.creationDate}
            </Text>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <FlatList
      renderItem={({ item }) => renderItem(item)}
      data={notesStore.notes}
      ListHeaderComponent={
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ flex: 1 }}> Your Notes</Text>
          </View>
          <View>
            <Button
              onPress={() => {
                notesStore.openDialog(NotesDialogs.AddNoteDialog);
              }}
            >
              New Note +
            </Button>
          </View>
        </View>
      }
      ListEmptyComponent={
        <Card style={styles.emptyListItem}>
          <TouchableOpacity
          onPress={() => {
            notesStore.openDialog(NotesDialogs.AddNoteDialog);
          }}>
            <View style={{ flex: 1, justifyContent:"center" }}>
              <Text style={{ color: "white", fontSize:18 }}>{"Add new note +"}</Text>
            </View>
          </TouchableOpacity>
        </Card>
      }
      contentContainerStyle={{ flexGrow: 1 }}
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 2,
    backgroundColor: Colors.secondery,
  },

  listItem: {
    backgroundColor: Colors.secondery,
    minHeight: 50,
    height: "auto",
    margin: 5,
    padding: 10,
    paddingLeft:20,
    textAlignVertical: "center",
  },
  emptyListItem: {
    backgroundColor: Colors.basicGrey,
    minHeight: 50,
    height: "auto",
    margin: 5,
    padding: 10,
    textAlignVertical: "center",
  },

  verticalContainer: {
    flex: 0,
    padding: 5,
    flexDirection: "row",
  },

  addButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});
