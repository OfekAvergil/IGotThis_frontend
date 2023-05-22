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

    return () => {
      // This cleanup function will run when the component is unmounted or when the dependencies change
    };
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
              <Icon source="checkbox-blank-circle-outline" size={24} color={Colors.primary} />
              <Text style={{ color: "white", fontSize: 20, paddingLeft:10 }}>{item.content}</Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
              <PopUpMenu 
              menuItems={
                <>
                  <Menu.Item title="Add To Calnader" leadingIcon="calendar-plus" onPress={() => {
                    todosStore.setSelectedTodo(item);
                    eventsStore.openDialog(EventsDialogs.AddEventDialog);
                  }}/>
                  <Menu.Item title="Edit" leadingIcon="lead-pencil"  onPress={() => {
                todosStore.setSelectedTodo(item);
                    todosStore.openDialog(TodoDialogs.EditTodoDialog);
                  }}/>
                  <Menu.Item title="Delete" leadingIcon="delete" onPress={()=>checkNote(item)}  />
                </>
              }
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
    ></FlatList>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    padding: 2,
    backgroundColor: Colors.secondary,
  },

  listItem: {
    backgroundColor: Colors.secondary,
    minHeight: 30,
    height: "auto",
    margin: 5,
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
