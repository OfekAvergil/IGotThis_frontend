import * as React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { Text, Button, List, Card } from "react-native-paper";
import notesStore, { note } from "../stores/notesStore";

export default function NotesList() {
  const renderItem = (item: note) => {
    return (
      <Card style={styles.listItem}>
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
      </Card>
    );
  };

  const renderEmpty = () => <List.Item title="let's enter a new note!" />;

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
