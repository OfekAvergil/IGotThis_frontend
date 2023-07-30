import * as React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import { Colors, Pages, Strings } from "../consts";
import todosStore, { toDo } from "../stores/todosStore";
import Icon from "react-native-paper/src/components/Icon";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const NextTasks = () => {
  const [todos, setTodos] = React.useState<toDo[]>([]);
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  /**
   * when todo is clicked - delete it from the todos list.
   * @param item - the done todo item
   */
  function checkNote(item: toDo): void {
    todosStore.deleteTodo(item.id);
  }
  
  /**
   * Get the top 3 tasks from todosStore.tasks
   */
  const getTopThreeTasks = () => {
    const sliced = todosStore.tasks.slice(0, 3);
    setTodos(sliced);
  };

  // always get 3 first todos
  React.useEffect(() => {
    getTopThreeTasks();
  }, [todosStore.tasks]);

  const emptyItem = (
    <Card style={styles.emptyListItem}>
      <TouchableOpacity onPress={() => navigate(Pages.ToDo)}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "white" }}>{Strings.empty_tasks_message}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Card>
  );

  const renderItem = (item: toDo) => {
    return (
      <Card style={styles.listItem}>
        <TouchableOpacity
          onPress={() => {
            checkNote(item);
          }}
        >
          <View style={{ flex: 1, margin: 2 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon
                source="checkbox-blank-circle-outline"
                size={16}
                color={Colors.primary}
              />
              <Text style={{ color: "white", fontSize: 16, paddingLeft: 10 }}>
                {item.content}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Card>
    );
  };

  return (
    <FlatList
      style={styles.container}
      renderItem={({ item }) => renderItem(item)}
      //Todo: only 3 tasks and update them
      data={todos}
      ListHeaderComponent={
        <View style={{ flexDirection: "row" }}>
          <View style={{ padding: 10 }}>
            <Text> {Strings.next_tasks_title} </Text>
          </View>
        </View>
      }
      ListEmptyComponent={emptyItem}
    ></FlatList>
  );
};
export default NextTasks;

const styles = StyleSheet.create({
  container: {
    padding: 2,
    marginBottom: 5,
  },
  listItem: {
    backgroundColor: Colors.secondery,
    minHeight: 30,
    height: "auto",
    margin: 10,
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
});
