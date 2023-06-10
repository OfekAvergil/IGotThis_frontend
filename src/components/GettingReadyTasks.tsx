import * as React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Text, Card } from "react-native-paper";
import { Colors } from "../consts";
import Icon from 'react-native-paper/src/components/Icon'
import eventsStore, { eventTask } from "../stores/eventsStore";

const GettingReadyTasks = () => {
  const [todos, setTodos] = React.useState<eventTask[]>([]);

  // set the current event's todos.
  React.useEffect(() => {
    if (eventsStore.currentEventId) {
      setTodos(eventsStore.findCurrentEvent()?.tasks || []);
      console.log(eventsStore.findCurrentEvent()?.tasks);
    }
  }, [eventsStore.currentEventId]);

  const emptyItem = (
    <Card style={styles.emptyListItem}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'white', fontSize: 20, paddingLeft: 10 }}>
            {'no tasks planned'}
          </Text>
        </View>
      </View>
    </Card>
  );

  const renderItem = (item: eventTask) => {
    const itemStyle = {
      ...styles.listItem,
      backgroundColor: item.isDone ? Colors.light : Colors.secondery,
    };

    return (
      <Card style={itemStyle}>
        <TouchableOpacity disabled ={item.isDone ? true: false} onPress={() => {item.isDone = !item.isDone}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              margin: 2,
            }}
          >
            <View style={{ flex: 3, flexDirection: 'row' }}>
              <Icon
                source={item.isDone ? 'checkbox-marked-circle' : 'checkbox-blank-circle-outline'}
                size={24}
                color={Colors.primary}
              />
              <Text style={{ color: 'white', fontSize: 16, paddingLeft: 10 }}>{item.content}</Text>
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
      data={todos}
      ListHeaderComponent={
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1, paddingBottom: 10 }}>
            <Text style={{ flex: 1, fontSize: 16 }}> Your Next Tasks: </Text>
          </View>
        </View>
      }
      ListEmptyComponent={emptyItem}
    ></FlatList>
  );
};

export default GettingReadyTasks;



const styles = StyleSheet.create({
  container: {
    padding: 2,
    height: 400,
    marginBottom: 16,
  },

  listItem: {
    minHeight: 50,
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
