import React from "react";
import { View, SafeAreaView, StyleSheet, Linking } from "react-native";
import { Text, Button,  Card } from "react-native-paper";
import CurrentEventHeader from "../../components/CurrentEventHeader";
import { Colors, Pages, Strings } from "../../consts";
import eventsStore, { event } from "../../stores/eventsStore";
import { observer } from "mobx-react";
import GettingReadyTasks from "../../components/GettingReadyTasks";


const GettingReadyScreen = ({ navigation }: any) => {
  const [currentEvent, setCurrentEvent] = React.useState<event | undefined>(undefined);
  const ObservedHeader = observer(CurrentEventHeader);
  const ObservedTasks  = observer(GettingReadyTasks);

  React.useEffect(()=>{
    if(eventsStore.currentEventId){
      setCurrentEvent(eventsStore.findCurrentEvent());
    }
  }, [eventsStore.currentEventId, ])

  /**
   * exit the current event mode
   */
  function handleExit(): void {
    eventsStore.setCurrentEvent(undefined);
    navigation.navigate(Pages.NavBar);      
  };

  /**
   * move to current event display
   */
  function startEvent(): void {
    navigation.navigate(Pages.CurrentEvent);    
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
      <ObservedHeader
        header={currentEvent?.title || ""}
        hour={time}
        note={currentEvent?.content}
        location={currentEvent?.location}
        handleExit={handleExit}
      />
      <Card style={styles.card}>
        <Card.Content>
          <View style={{ paddingTop: 10 }}>
            <ObservedTasks />
          </View>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text>
              {Strings.need_directions_note}
            </Text>
             <Button
                icon = "navigation"
                mode="outlined"
                onPress={() => {navigate(currentEvent?.location || "")}}
                labelStyle={{ fontSize: 16, color:Colors.secondery }}
                style={{ borderColor: Colors.secondery ,justifyContent:"center" , margin:10}}
                >
              <Text style={{color: Colors.secondery,  fontSize:18}}>
                {Strings.navigate_button}
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
              {Strings.start_event_button}
            </Button>
          </View>
        </Card.Content>
      </Card>
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
