import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from "react-native";
import { Card } from 'react-native-paper';
import { Colors } from '../consts';
import eventsStore, { event } from '../stores/eventsStore';

const NextEvent = () => {
  const [event, setEvent] = React.useState<event>();

  // always get next event
  //TODO : find next event
  React.useEffect(()=>{
    setEvent(eventsStore.events[0]);
  }, [eventsStore.events])

  const emptyState= (
    <Card style={styles.emptyListItem}>
        <View style={{ flex: 2, flexDirection: "row", alignItems: "center"}}>
          <Text style={{ color: "white", fontSize: 18 }}>
            No events planned</Text>
        </View>
    </Card>
  )

  return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 3, padding: 10 }}>
            <Text style={{ flex: 1 }}> Your Next Event</Text>
          </View>
        </View>
        {!event ? emptyState :
          <Card style={styles.listItem}>
              <View style={{ flex: 2, flexDirection: "row", alignItems: "center"}}>
                <Text style={{ color: "white", fontSize: 22 }}>{event?.title}</Text>
              </View>
              <View style={{ flex: 1}}>
              <Text style={{ color: Colors.basicGrey, textAlign: "left", fontSize: 14 }}>
                from : {event?.dateStart} at {event?.startTime}
              </Text>
              <Text style={{ color: Colors.basicGrey, textAlign: "left", fontSize: 14 }}>
                to : {event?.dateEnd} at {event?.endTime}
              </Text>
            </View>
          </Card>
        }
      </View>
  );
};

export default NextEvent;

const styles = StyleSheet.create({
    
  container: {
    //flex: 1,
    //justifyContent: "flex-end",
    marginBottom: 16,
    marginTop: 16,
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
    backgroundColor: Colors.secondary,
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