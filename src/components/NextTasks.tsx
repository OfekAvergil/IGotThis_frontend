import * as React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Button, Card, Menu } from "react-native-paper";
import noteStore from "../stores/notesStore";
import { useEffect } from "react";
import userStore from "../stores/userStore";
import { Colors } from "../consts";
import todosStore, { TodoDialogs, toDo } from "../stores/todosStore";
import PopUpMenu from "./PopUpMenu";
import Icon from 'react-native-paper/src/components/Icon'
import eventsStore, { EventsDialogs } from "../stores/eventsStore";

const NextTasks = () => {
  const [todos, setTodos] = React.useState<toDo[]>([]);

  /**
 * when todo is clicked - delete it from the todos list.
 * @param item - the done todo item
 */
  function checkNote(item: toDo): void{
    todosStore.deleteTodo(item.id)
  }

  // always get 3 first todos
  React.useEffect(()=>{
    const sliced = todosStore.tasks.slice(0, 3);
    setTodos(sliced)
  }, [todosStore.tasks])

  const emptyItem = (
    <Card style={styles.emptyListItem}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "white" }}>{"no tasks planned"}</Text>
          </View>
        </View>
    </Card>
  )

  const renderItem = (item: toDo) => {
    return (
      <Card style={styles.listItem}>
        <TouchableOpacity
          onPress={() => { checkNote(item)}}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", margin: 2 }}>
            <View style={{ flex: 3, flexDirection: "row" }}>
              <Icon source="checkbox-blank-circle-outline" size={24} color={Colors.primary} />
              <Text style={{ color: "white", fontSize: 20, paddingLeft:10 }}>{item.content}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
      <FlatList style={styles.container}
        renderItem={({ item }) => renderItem(item)}
        //Todo: only 3 tasks and update them
        data={todos}
        ListHeaderComponent={
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 1, padding: 10 }}>
              <Text style={{ flex: 1 }}> Your Next Tasks</Text>
            </View>
          </View>
        }
        ListEmptyComponent={emptyItem}
      ></FlatList>
  );
}
export default NextTasks;


const styles = StyleSheet.create({
  container: {
    padding: 2,
    height: 350,
    marginBottom: 16,
  },

  listItem: {
    backgroundColor: Colors.secondary,
    minHeight: 30,
    height: "auto",
    margin: 10,
    padding: 10,
    textAlignVertical: "center",
  },
  emptyListItem: {
    backgroundColor: Colors.basicGrey,
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
    color: "white",
  },
  item: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
  },
});
