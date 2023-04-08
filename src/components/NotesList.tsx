import * as React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, List, Card } from "react-native-paper";
import notesStore, { note } from "../stores/notesStore";
import { getNotes } from "../api/api";
import userStore from "../stores/userStore";
import { useEffect } from "react";

export default function NotesList() {
  //TODO: how to use the useStore hook?
  //const store = useStore();

  const getSavedNotes = async () => {
    getNotes(userStore.user_name)
        .then(data => {
            if (data) {
              notesStore.setNotes(data);
            }
    }).catch(e => console.error(`failed to get notes for ${userStore.user_name}`, e));
  };

  useEffect(() => {
    getSavedNotes();
  }, [userStore.user_name])

  const renderItem = (item: note) => {
    return (
      <Card style={styles.listItem}>
        <TouchableOpacity onPress={()=>{
          notesStore.setSelectedNote(item);
          notesStore.openNote(true);
        }
        }>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "white" }}>{item.name}</Text>
          </View>
          <View>
            <Text style={{ color: "white", textAlign: "left", fontSize: 10 }}>
              {" "}
              {item.creationDate}
            </Text>
          </View>
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
              onPress={() => { notesStore.setVisible(true);}}>
              New Note +
            </Button>
          </View>
        </View>
      }
      ListEmptyComponent={
        <Card style={styles.emptyListItem}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "white" }}>{"Add new note +"}</Text>
          </View>
        </View>
      </Card>
      }
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 2,
    backgroundColor: "#612CD4",
  },

  listItem: {
    backgroundColor: "#612CD4",
    minHeight: 40,
    height: "auto",
    margin: 5,
    padding: 10,
    textAlignVertical: "center",
  },
  emptyListItem: {
    backgroundColor: "#BFBFBF",
    minHeight: 40,
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
    color: "#fff",
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});
