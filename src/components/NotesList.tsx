import * as React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button,  Card,  Menu } from "react-native-paper";
import notesStore, { NotesDialogs, note } from "../stores/notesStore";
import noteStore from "../stores/notesStore";
import { useEffect } from "react";
import userStore from "../stores/userStore";
import { Colors, Strings } from "../consts";
import PopUpMenu from "./PopUpMenu";


export default function NotesList() {
  useEffect(() => {
    noteStore.fetchNotes(userStore.secretKey);
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
              menuItems={[
                {
                  title: Strings.popup_menu_edit_button,
                  action: () => {
                    notesStore.setSelectedNote(item);
                    notesStore.openDialog(NotesDialogs.EditNoteDialog);
                  },
                  leadingIcon: "lead-pencil"
                },
                {
                  title: Strings.popup_menu_delete_button,
                  action: () => {
                    noteStore.deleteNote(item.id);
                  },
                  leadingIcon: "delete"
                },
              ]}
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
            <Text style={{ flex: 1 }}> {Strings.notes_header} </Text>
          </View>
          <View>
            <Button
              onPress={() => {
                notesStore.openDialog(NotesDialogs.AddNoteDialog);
              }}
            >
              {Strings.new_note_button}
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
    backgroundColor: Colors.primary,
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
