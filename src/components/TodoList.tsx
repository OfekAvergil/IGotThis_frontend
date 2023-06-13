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

export default function TodoList() {
  useEffect(() => {
    // This code will run after the component has been rendered to the screen
    console.log('userStore.secretKey' + userStore.secretKey)
    todosStore.fetchTodos(userStore.secretKey);
    console.log(noteStore.notes)
  }, []);

  /**
   * when todo is clicked - delete it from the todos list.
   * @param item - the done todo item
   */
  function checkNote(item: toDo): void{
    todosStore.deleteTodo(item.id)
  }

  const renderItem = (item: toDo) => {
    return (
      <Card style={styles.listItem}>
        <TouchableOpacity
          onPress={() => { checkNote(item)}}>
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", margin: 2 }}>
            <View style={{ flex: 3, flexDirection: "row" }}>
              <Icon source="checkbox-blank-circle-outline" size={16} color={Colors.primary} />
              <Text style={{ color: "white", fontSize: 16, paddingLeft:10 }}>{item.content}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
              <PopUpMenu 
                menuItems={[
                  {
                    title: "Add To Calnader",
                    action: () => {
                      todosStore.setSelectedTodo(item);
                      eventsStore.openDialog(EventsDialogs.AddEventDialog);
                    },
                    leadingIcon: "calendar-plus"
                  },
                  {
                    title: "Edit",
                    action: () => {
                      todosStore.setSelectedTodo(item);
                      todosStore.openDialog(TodoDialogs.EditTodoDialog);
                    },
                    leadingIcon: "lead-pencil"
                  },
                  {
                    title: "Delete",
                    action: () => {
                      checkNote(item);
                    },
                    leadingIcon: "delete"
                  },
                ]}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <FlatList
      renderItem={({ item }) => renderItem(item)}
      data={todosStore.tasks}
      ListHeaderComponent={
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Text style={{ flex: 1 }}> Your Tasks</Text>
          </View>
          <View>
            <Button
              onPress={() => {
                todosStore.openDialog(TodoDialogs.AddTodoDialog);
              }}
            >
              New Task +
            </Button>
          </View>
        </View>
      }
      ListEmptyComponent={
        <Card style={styles.emptyListItem}>
          <TouchableOpacity
          onPress={() => {
            todosStore.openDialog(TodoDialogs.AddTodoDialog);
          }}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: "white" }}>{"Add new task +"}</Text>
              </View>
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
    minHeight: 30,
    height: "auto",
    margin: 5,
    padding: 10,
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
