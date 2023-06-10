import * as React from "react";
import { TextInput } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import { Colors } from "../consts";
import { useState } from "react";
import userStore, { settingsDialogs } from "../stores/userStore";

const EditAccountDialog = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  
  React.useEffect(()=>{
    resetModal();
  }, [userStore.user])

  const resetModal =() =>{
    if(userStore.user){
      setUsername(userStore.user.user_name);
      setEmail(userStore.user.mail);
      setAddress(userStore.user.homeAddress||"");
      setContact(userStore.user.contactNumber|| "");
    }
  }

  return BasicDialog({
    title: "Account Settings",
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <TextInput
            label="Name"
            value={username}
            onChangeText={(title) => setUsername(title)}
            style={styles.input}
          />      
          <TextInput
            label="Mail"
            value={email}
            onChangeText={(title) => setEmail(title)}
            style={styles.input}
          />          
          <TextInput
            label="Home Address"
            value={address}
            onChangeText={(title) => setAddress(title)}
            style={styles.input}
          />
          <TextInput
            label="Emergency Contact"
            value={contact}
            onChangeText={(title) => setContact(title)}
            style={styles.input}
          />

        </View>
      </View>
    ),
    isVisible: userStore.isDialogOpen(settingsDialogs.AccountDialog),
    enableActions: true,
    onOk: () => {
      console.log("ok");
      userStore.closeAllDialogs();
      userStore.editUser(username, email, address, contact);
    },
    onCancle: () => {
      console.log("cancle");
      resetModal();
      userStore.closeAllDialogs();
    },
    onDismiss: () => {
      resetModal();
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
    height: 50,
    borderColor: Colors.basicGrey,
    backgroundColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputArea: {
    height: 200,
    backgroundColor: Colors.basicGrey,
    borderColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
});
