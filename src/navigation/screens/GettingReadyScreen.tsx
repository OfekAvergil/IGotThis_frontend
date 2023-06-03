import React from "react";
import { View, SafeAreaView, StyleSheet, Linking } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import CurrentEventHeader from "../../components/CurrentEventHeader";
import { Audio } from "expo-av";
import { Colors } from "../../consts";
import eventsStore, { event } from "../../stores/eventsStore";
import TasksFromEventDialog from "../../dialogs/TasksFromEventDialog";
import { observer } from "mobx-react";
import GettingReadyTasks from "../../components/GettingReadyTasks";


const GettingReadyScreen = ({ navigation }: any) => {
  const [content, setContent] = React.useState("");
  const [recording, setRecording] = React.useState<Audio.Recording | null>(null);
  const [currentEvent, setCurrentEvent] = React.useState<event | undefined>(undefined);

  const ObservedShowEvent = observer(TasksFromEventDialog);

  React.useEffect(()=>{
    if(eventsStore.currentEventId){
      console.log("ehy", eventsStore.currentEventId)
      setCurrentEvent(eventsStore.findCurrentEvent());
    }
  }, [eventsStore.currentEventId, ])

  /**
   * exit the current event mode
   */
  function handleExit(): void {
    eventsStore.setCurrentEvent(undefined);
    console.log(navigation);
    navigation.navigate('NavBar');      
  };

  /**
   * move to current event display
   */
  function startEvent(): void {
    console.log(navigation);
    navigation.navigate('CurrentEvent');    
  }

  /**
   * open google maps on public transformation tab with the event's location
   * @param address 
   */
  const navigate = (address: string) => {
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}&dir_action=navigate&travelmode=transit`;
    Linking.openURL(googleMapsUrl);
  };

  let time = currentEvent?.startTime + '-' + currentEvent?.endTime;

  return (
    <SafeAreaView style={styles.container}>
      <CurrentEventHeader
        header={currentEvent?.title || ""}
        hour={time}
        note={currentEvent?.content || ""}
        location={currentEvent?.location}
        handleExit={handleExit}
      />
      <Card style={styles.card}>
        <Card.Content>
          <View style={{ paddingTop: 10 }}>
            <GettingReadyTasks />
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text>
              Need directions?
            </Text>
             <Button
                icon = "navigation"
                mode="outlined"
                onPress={() => {navigate(currentEvent?.location || "")}}
                labelStyle={{ fontSize: 16, color:Colors.secondery }}
                style={{ borderColor: Colors.secondery ,justifyContent:"center" , margin:10}}
                disabled={currentEvent?.location? false: true}
                >
              <Text style={{color: Colors.secondery,  fontSize:18}}>
                Navigate 
              </Text>
            </Button>
          </View>
          <View
            style={{ width: "100%", paddingTop: 30, alignItems: "flex-end" }}
          >
            <Button
              style={{}}
              mode="contained"
              icon="check"
              onPress={startEvent}
            >
              start event
            </Button>
          </View>
        </Card.Content>
      </Card>
      <ObservedShowEvent/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    flex: 5,
  },
  card_title: {
    marginTop: 50,
    color: Colors.primary,
    fontSize: 30,
  },
  card_button: {
    margin: 7,
  },
  inputArea: {
    height: 200,
    borderColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
});

export default GettingReadyScreen;
