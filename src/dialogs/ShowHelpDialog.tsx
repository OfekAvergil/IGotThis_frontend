import * as React from "react";
import { Text } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import { Strings } from "../consts";
import userStore, { settingsDialogs } from "../stores/userStore";

const ShowHelpDialog = () => {

  return BasicDialog({
    title: Strings.settings_page_help,
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <Text>
            {Strings.help_content}
          </Text>
        </View>
      </View>
    ),
    isVisible: userStore.isDialogOpen(settingsDialogs.HelpDialog),
    enableActions: false,
    onDismiss: () =>{
      userStore.closeAllDialogs();      
    },
  });
};

export default ShowHelpDialog;

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
