import * as React from "react";
import { TextInput, Switch, Text   } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View} from "react-native";
import { Colors } from "../consts";
import { useState } from "react";
import userStore, { settingsDialogs } from "../stores/userStore";

const EditAccountDialog = () => {
  const [gettingReadyTime, setTime] = useState('30');
  const [notifications, setNotifications] = useState(true);
  const [tasks, setTasks] = useState(true);

  return BasicDialog({
    title: "Preferences",
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <Text  style={styles.notes}>
            Send notification in time to get ready to event?
          </Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.label}>
              Getting ready mode: 
            </Text>
            <Switch value={notifications} onValueChange={()=> setNotifications(!notifications)} />
          </View>
          <Text style={styles.notes}>
          How much minutes it takes you to get ready?
          </Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.label}>
              Time (in minutes): 
            </Text>
            <TextInput
              value={gettingReadyTime}
              onChangeText={(title) => setTime(title)}
              style={styles.input}
            /> 
          </View>
          <Text style={styles.notes}>
            Create automatically tasks for help you getting ready?
          </Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.label}>
              Getting ready tasks: 
            </Text>
            <Switch value={tasks} onValueChange={()=> setTasks(!tasks)} />
          </View>     
        </View>
      </View>
    ),
    isVisible: userStore.isDialogOpen(settingsDialogs.PreferencesDialog),
    enableActions: true,
    onOk: () => {
      console.log("ok");
      userStore.closeAllDialogs();
    },
    onCancle: () => {
      console.log("cancle");
      userStore.closeAllDialogs();
    },
    onDismiss: () => {
      userStore.closeAllDialogs();
    },
  });
};

export default EditAccountDialog;

const styles = StyleSheet.create({
  dialogContent: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  form: {
    marginBottom: 15,
  },
  input: {
    height: 30,
    width: 60,
    // borderColor: Colors.basicGrey,
    backgroundColor: "white",
    // borderWidth: 1,
    // borderRadius: 5,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  notes: {
    fontSize: 14,
    color: Colors.basicGrey
  },
  label: {
    fontSize: 16,
    color: "black"
  }
});
