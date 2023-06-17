import * as React from "react";
import { Text } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import eventsStore, { EventsDialogs } from "../stores/eventsStore";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { handleExtractTasks, handleSpeechToText } from "../api/OpenaiAPI";
import { Pages, Strings } from "../consts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const TasksFromEventDialog = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return BasicDialog({
    title: "notice",
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <Text>
            {Strings.tasks_from_event_prompt}
          </Text>
        </View>
      </View>
    ),
    isVisible: eventsStore.isDialogOpen(EventsDialogs.TasksFromEventDialog),
    enableActions: true,
    onDismiss: () => {
      eventsStore.closeAllDialogs();
      navigate(Pages.NavBar);
    },
    onCancle: () => {
      eventsStore.closeAllDialogs();
      navigate(Pages.NavBar);
    },
    onOk: () => {
      handleExtractTasks();
      handleSpeechToText();
      eventsStore.closeAllDialogs();
      navigate(Pages.NavBar);
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
    marginBottom: 15,
  },
});
