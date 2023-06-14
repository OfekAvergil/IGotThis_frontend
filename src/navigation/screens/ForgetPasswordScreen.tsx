import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore from "../../stores/userStore";
import LoginHeader from "../../components/LoginHeader";
import { Colors } from "../../consts";
import { observer } from "mobx-react";
import LoginError from "../../components/LoginError";

const ForgetPasswordScreen = ({ navigation }: any) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const ObserverMessage = observer(LoginError)

  async function handleSend() {
    await userStore.restPassword({user_name: inputUsername, mail: inputMail, password: password});
    if(isPasswordsOk()){
      if(!userStore.errorMessage){
        userStore.setErrorMessage("");
        setInputUsername("");
        setInputMail("");
        navigation.navigate("PickView");
      };
    } else {
      userStore.setErrorMessage("passwords do not match.");
    }   
  };
  
  const isPasswordsOk = (): boolean => {
    return (password === passwordRepeat);
  }

  const handleBack = () => { 
    setInputUsername("");
    setInputMail("");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader header="Enter the user's details"/>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            value={inputUsername}
            onChangeText={setInputUsername}
            placeholder="User name"
            secureTextEntry={false}
            right={<TextInput.Icon icon="account" />}
            style={styles.input}
          />
          <TextInput
            placeholder="Mail"
            value={inputMail}
            onChangeText={setInputMail}
            secureTextEntry={true}
            style={styles.input}
            right={<TextInput.Icon icon="email" />}
            
          />
          <TextInput
            label="New Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye-off-outline" />}
            style={styles.input}
          />
          <TextInput
            label="Confirm Password"
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye-off-outline" />}
            style={styles.input}
          />
          <ObserverMessage/>
          < View>
          <Button
            style={{}}
            mode="outlined"
            icon="chevron-left"
            onPress={handleBack}
          >
            Back
          </Button>
          <Button
            style={{}}
            mode="contained"
            icon="check"
            onPress={handleSend}
            disabled={inputUsername==="" || inputMail===""}
          >
            Send
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
