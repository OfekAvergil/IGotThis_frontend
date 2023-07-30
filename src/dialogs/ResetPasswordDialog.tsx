import * as React from "react";
import { Text } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import eventsStore, { EventsDialogs } from "../stores/eventsStore";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { handleExtractTasks, handleSpeechToText } from "../api/OpenaiAPI";
import { Pages, Strings } from "../consts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import userStore, { settingsDialogs } from "../stores/userStore";

const ResetPasswordDialog = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return BasicDialog({
    title: Strings.info_alert_header,
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <Text>
            {Strings.reset_password_prompt}
          </Text>
        </View>
      </View>
    ),
    isVisible: userStore.isDialogOpen(settingsDialogs.ResetPassword),
    enableActions: false,
    onDismiss: () => {
      userStore.closeAllDialogs();
      navigate(Pages.NavBar);
    },
  });
};

export default ResetPasswordDialog;

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
