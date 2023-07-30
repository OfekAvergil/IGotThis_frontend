import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore, { settingsDialogs } from "../../stores/userStore";
import LoginHeader from "../../components/LoginHeader";
import { Colors, Pages, Strings } from "../../consts";
import { observer } from "mobx-react";
import LoginError from "../../components/LoginError";
import ResetPasswordDialog from "../../dialogs/ResetPasswordDialog";

const ForgetPasswordScreen = ({ navigation }: any) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const ObserverMessage = observer(LoginError)
  const ObservedModal = observer(ResetPasswordDialog);

  async function handleSend() {
    await userStore.restPassword({user_name: inputUsername, mail: inputMail, password: password});
    if(isPasswordsOk()){
      if(!userStore.errorMessage){
        userStore.setErrorMessage("");
        clearPage();
        userStore.openDialog(settingsDialogs.ResetPassword);
      };
    } else {
      userStore.setErrorMessage(Strings.error_passwords_not_match);
    }   
  };
  
  const isPasswordsOk = (): boolean => {
    return (password === passwordRepeat);
  }

  const handleBack = () => { 
    clearPage();
    navigation.navigate(Pages.Login);
  };

  const clearPage = ()=>{
    setInputMail("");
    setInputUsername("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader header={Strings.forget_password_header}/>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            value={inputUsername}
            onChangeText={setInputUsername}
            label={Strings.user_field_header}
            secureTextEntry={false}
            right={<TextInput.Icon icon="account" />}
            style={styles.input}
          />
          <TextInput
            label={Strings.email_field_header}
            value={inputMail}
            onChangeText={setInputMail}
            secureTextEntry={false}
            style={styles.input}
            right={<TextInput.Icon icon="email" />}
            
          />
          <TextInput
            label={Strings.new_password_field_header}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye-off-outline" />}
            style={styles.input}
          />
          <TextInput
            label={Strings.reenter_password_field_header}
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye-off-outline" />}
            style={styles.input}
          />
          <ObserverMessage/>
          <View style={{flexDirection:"row"}}>
            <View
                style={{
                  flex: 1,
                  justifyContent: "flex-start",
                  flexDirection: "row",
                  paddingHorizontal: 15,
                }}
              >
              <Button
                style={{}}
                mode="outlined"
                icon="chevron-left"
                onPress={handleBack}
              >
                {Strings.back_button}
              </Button>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                flexDirection: "row",
                paddingHorizontal: 15,
              }}
            >
              <Button
                style={{}}
                mode="contained"
                icon="check"
                onPress={handleSend}
                disabled={inputUsername==="" || inputMail===""}
              >
                {Strings.ok_button}
              </Button>
            </View>
          </View>
        </Card.Content>
      </Card>
      <ObservedModal/>
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
    flex:3
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
  card_title: {
    marginTop: 50,
    color: Colors.primary,
    fontSize: 30,
  },
  card_button: {
    margin:7,
  },
});

export default ForgetPasswordScreen;
