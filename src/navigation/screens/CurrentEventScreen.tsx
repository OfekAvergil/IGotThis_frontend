import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import CurrentEventHeader from "../../components/CurrentEventHeader";
import { Audio } from "expo-av";
import { Colors } from "../../consts";
import EventRecorder from "../../components/CurrentEventRecorder";
import notesStore from "../../stores/notesStore";
import eventsStore, { EventsDialogs, event } from "../../stores/eventsStore";
import TasksFromEventDialog from "../../dialogs/TasksFromEventDialog";
import { observer } from "mobx-react";


const CurrentEventScreen = ({ navigation }: any) => {
  const [content, setContent] = React.useState("");
  const [recording, setRecording] = React.useState<Audio.Recording | null>(null);
  const [currentEvent, setCurrentEvent] = React.useState<event | undefined>(undefined);

  const ObservedShowEvent = observer(TasksFromEventDialog);


  React.useEffect(()=>{
    if(eventsStore.currentEventId){
      setCurrentEvent(eventsStore.findCurrentEvent());
    }
  }, [eventsStore.currentEventId])

  function handleExit(): void {
    eventsStore.setCurrentEvent(undefined);
    // if the user entered data to remember, pop the option to create tasks.
    if(content || recording){
      eventsStore.openDialog(EventsDialogs.TasksFromEventDialog);
    } else {
      console.log(navigation);
      navigation.navigate('NavBar');
    }
  };

  /**
   * when the event is over, creates new note with the written and recorded notes from the event.
   */
  function endEvent(): void {
    if(currentEvent){
      let uri: string | null = null;
      if(recording){
        uri = recording?.getURI();
        notesStore.setRecordingCurrentEventNote(uri);
      }
      if (content) notesStore.setTextCurrentEventNote(content);
      notesStore.addNote(currentEvent.title, content, uri ? uri : undefined);
    }
    handleExit();
  }

  let time = currentEvent?.startTime + "-" + currentEvent?.endTime;

  return (
    <SafeAreaView style={styles.container}>
      <CurrentEventHeader
        header={currentEvent?.title || ""}
        hour={time}
        note={currentEvent?.content}
        handleExit={handleExit}
      />
      <Card style={styles.card}>
        <Card.Content>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ color: "grey", padding: 10 }}>
              you can record the meeting
            </Text>
            <EventRecorder
              addNewRec={(record: Audio.Recording | null) => {
                setRecording(record);
              }}
            />
          </View>
          <View style={{ paddingTop: 40 }}>
            <Text style={{ color: "grey", padding: 10 }}>
              or take some notes
            </Text>
            <TextInput
              placeholder="write here..."
              value={content}
              onChangeText={(content) => setContent(content)}
              multiline={true}
              numberOfLines={5}
              style={styles.inputArea}
            />
          </View>
          <View
            style={{ width: "100%", paddingTop: 30, alignItems: "flex-end" }}
          >
            <Button 
            style={{}} 
            mode="contained" 
            icon="check" 
            onPress={endEvent}
            >
              Done!
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

export default CurrentEventScreen;
