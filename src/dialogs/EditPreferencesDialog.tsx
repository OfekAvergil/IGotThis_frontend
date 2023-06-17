import * as React from "react";
import { TextInput, Switch, Text   } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View} from "react-native";
import { Colors, Strings } from "../consts";
import { useState } from "react";
import userStore, { settingsDialogs } from "../stores/userStore";

const EditAccountDialog = () => {
  const [gettingReadyTime, setTime] = useState('30');
  const [notifications, setNotifications] = useState(true);
  const [tasks, setTasks] = useState(true);

  return BasicDialog({
    title: Strings.preferences_header,
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <Text  style={styles.notes}>
           {Strings.send_notification_prompt}
          </Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.label}>
              {Strings.getting_ready_mode_label}
            </Text>
            <Switch value={notifications} onValueChange={()=> setNotifications(!notifications)} />
          </View>
          <Text style={styles.notes}>
          {Strings.getting_ready_time_prompt}
          </Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.label}>
              {Strings.time_minutes_label}: 
            </Text>
            <TextInput
              value={gettingReadyTime}
              onChangeText={(title) => setTime(title)}
              style={styles.input}
            /> 
          </View>
          <Text style={styles.notes}>
            {Strings.getting_ready_tasks_prompt}
          </Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            <Text style={styles.label}>
              {Strings.getting_ready_tasks_label}
            </Text>
            <Switch value={tasks} onValueChange={()=> setTasks(!tasks)} />
          </View>     
        </View>
      </View>
    ),
    isVisible: userStore.isDialogOpen(settingsDialogs.PreferencesDialog),
    enableActions: true,
    onOk: () => {
      userStore.closeAllDialogs();
    },
    onCancle: () => {
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
