import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore from "../../stores/userStore";
import LoginHeader from "../../components/LoginHeader";
import { Colors, Pages, Strings } from "../../consts";
import { observer } from "mobx-react";
import LoginError from "../../components/LoginError";

const LogInScreen = ({ navigation }: any) => {
  const [inputMail, setInputMail] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const ObserverMessage = observer(LoginError)

  async function handleLogIn() {
    await userStore.loginUser({mail: inputMail, password: inputPassword});
    if(userStore.errorMessage===""){
      clearPage();
      navigation.navigate(Pages.PickView);
    }
  };

  const handleForgotPassword = () => {
    clearPage();
    navigation.navigate(Pages.ForgetPassword);
  };

  const handleCreateAccount = () => { 
    clearPage();
    navigation.navigate(Pages.Register);
  };

  const clearPage = ()=>{
    setInputMail("");
    setInputPassword("");
    userStore.setErrorMessage("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader header={Strings.login_page_header}/>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            value={inputMail}
            onChangeText={setInputMail}
            label={Strings.email_field_header}
            secureTextEntry={false}
            right={<TextInput.Icon icon="email" />}
            style={styles.input}
          />
          <TextInput
            label={Strings.password_field_header}
            value={inputPassword}
            onChangeText={setInputPassword}
            secureTextEntry={true}
            style={styles.input}
            right={<TextInput.Icon icon="eye-off-outline" />}
            
          />
            <Button
              uppercase={false}
              onPress={handleForgotPassword}
              mode="text"
              labelStyle={{color: "grey", fontWeight:"400", fontSize: 12}}
              style={{width:150 ,marginLeft: -12,
            }}
            >
              {Strings.login_page_forget_password_button}
            </Button>
          <ObserverMessage/>
          <Button
            style={{}}
            mode="contained"
            icon="account"
            onPress={handleLogIn}
            disabled={inputMail==="" || inputPassword===""}
          >
            {Strings.login_page_button}
          </Button>
          <Button
            style={styles.card_button}
            uppercase={false}
            onPress={handleCreateAccount}
          >
            <Text>
            Don't have an acount?
            </Text> Create one
          </Button>
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

export default LogInScreen;
