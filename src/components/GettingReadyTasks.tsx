import * as React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import { Colors } from "../consts";
import { toDo } from "../stores/todosStore";
import Icon from 'react-native-paper/src/components/Icon'
import eventsStore from "../stores/eventsStore";

const GettingReadyTasks = () => {
  const [todos, setTodos] = React.useState<toDo[]>([]);

  /**
 * when todo is clicked - mark it as done
 * @param item - the done todo item
 */
  function checkNote(item: toDo): void{

  }

  // set the current event's todos.
  React.useEffect(()=>{
    if(eventsStore.currentEventId){
      setTodos(eventsStore.findCurrentEvent()?.tasks);
    }
  }, [eventsStore.currentEventId])

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
              <Text style={{ flex: 1 }}> Your Next Task: Getting ready</Text>
            </View>
          </View>
        }
        ListEmptyComponent={emptyItem}
      ></FlatList>
  );
}
export default GettingReadyTasks;


const styles = StyleSheet.create({
  container: {
    padding: 2,
    height: 350,
    marginBottom: 16,
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
