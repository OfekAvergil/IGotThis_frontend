import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { Card } from 'react-native-paper';
import { Colors, Pages, Strings } from '../consts';
import eventsStore, { event } from '../stores/eventsStore';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const NextEvent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [nextEvent, setNextEvent] = React.useState<event>();

  const getNextEvent = () => {
    // Get the current date and time
    const currentDate: string = new Date().toISOString().slice(0, 10);
    const currentTime: string = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const sortedEvents = eventsStore.events.sort((a, b) => {
      const dateA = new Date(a.dateStart);
      const dateB = new Date(b.dateStart);
      return dateA.getTime() - dateB.getTime();
    });
  
    // Find the first event that starts after the current date
    const nextEvent = sortedEvents.find(event => {
      return event.dateStart >= currentDate  && event.startTime > currentTime;
    });
    setNextEvent(nextEvent);
  };
  
  // always get next event
  React.useEffect(()=>{
    getNextEvent();
    // rerender on each enter to this screen
    const unsubscribe = navigation.addListener('focus', () => {
      getNextEvent();
    });
    return unsubscribe;
  }, [navigation, eventsStore.events]);

  const emptyState = (
    <Card style={styles.emptyListItem}>
      <TouchableOpacity onPress={() => navigation.navigate(Pages.Calendar)}>
        <View>
          <Text style={{ color: "white", fontSize: 18 }}>
            {Strings.empty_events_message}
          </Text>
        </View>
      </TouchableOpacity>
    </Card>
  );

  const renderItem = (item: event) => (
    <Card style={styles.listItem}>
      <View style={{marginBottom:7}}>
        <Text style={{ color: "white", fontSize: 22 }}>{item.title}</Text>
      </View>
      <View>
        <Text style={{ color: Colors.basicGrey, textAlign: "left", fontSize: 14 }}>
          from: {item.dateStart} at {item.startTime}
        </Text>
        <Text style={{ color: Colors.basicGrey, textAlign: "left", fontSize: 14 }}>
          to: {item.dateEnd} at {item.endTime}
        </Text>
      </View>
    </Card>
  );

  return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ padding: 10 }}>
            <Text> {Strings.next_event_title} </Text>
          </View>
        </View>
        {nextEvent ? (
        renderItem(nextEvent)
        ) : (
          emptyState
        )}
      </View>
  );
};

export default NextEvent;

const styles = StyleSheet.create({
    
  container: {
    marginBottom: 5,
    marginTop:5,
    backgroundColor: 'transparent'
  },
  item: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.primary,
    borderRadius: 50,
  },
  listItem: {
    backgroundColor: Colors.secondery,
    minHeight: 130,
    height: "auto",
    margin: 10,
    padding: 20,
    textAlignVertical: "center",
  },
  emptyListItem: {
    backgroundColor: Colors.basicGrey,
    minHeight: 130,
    height: "auto",
    margin: 10,
    padding: 20,
    textAlignVertical: "center",
  }
  });