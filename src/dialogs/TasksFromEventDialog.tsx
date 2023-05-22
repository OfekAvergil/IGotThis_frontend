import * as React from "react";
import { Text } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import eventsStore, { EventsDialogs } from "../stores/eventsStore";
import { useNavigation } from "@react-navigation/native";

const TasksFromEventDialog = () => {
  const navigation = useNavigation();


  return BasicDialog({
    title: "notice",
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <Text>
              Would you like to create tasks from the notes taken in this event?
          </Text>
        </View>
      </View>
    ),
    isVisible: eventsStore.isDialogOpen(EventsDialogs.TasksFromEventDialog),
    enableActions: true,
    onDismiss: () =>{
      eventsStore.closeAllDialogs();
      console.log(navigation);
      navigation.navigate('NavBar');      
    },
    onCancle: () => {
      eventsStore.closeAllDialogs();
      console.log(navigation);
      navigation.navigate('NavBar'); 
    },
    // chatGPT connection here!
    onOk: () => {
      eventsStore.closeAllDialogs();
      console.log(navigation);
      navigation.navigate('NavBar'); 
    },

  });
};

export default TasksFromEventDialog;

const styles = StyleSheet.create({
  dialogContent: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  form: {
    marginBottom: 15
  }
});
