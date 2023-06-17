import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore from "../../stores/userStore";
import LoginHeader from "../../components/LoginHeader";
import { Colors, Pages, Strings } from "../../consts";
import LoginError from "../../components/LoginError";
import { observer } from "mobx-react";

const RegisterScreen = ({ navigation }: any) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const ObserverMessage = observer(LoginError)

  const handleRegister = () => {
    if(isPasswordsOk()){
      userStore.setErrorMessage("");
      userStore.setUser({
        user_name: username,
        password: password,
        mail: email,
        isSuperviosr: false
      })
      clearPage();
      navigation.navigate(Pages.Info);
    } else{
      userStore.setErrorMessage(Strings.error_passwords_not_match);
    }
  };

  const handkeAllreadyHaveAccount = () => {
    clearPage();
    navigation.navigate(Pages.Login);
  };

  const isPasswordsOk = (): boolean => {
    return (password === passwordRepeat);
  }

  const clearPage = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setPasswordRepeat("");
  }
  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader header={Strings.register_page_header}/>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label={Strings.user_field_header}
            value={username}
            onChangeText={setUsername}
            secureTextEntry={false}
            right={<TextInput.Icon icon="account" />}
            style={styles.input}
          />
          <TextInput
            label={Strings.email_field_header}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
            right={<TextInput.Icon icon="email" />}
            style={styles.input}          />
          <TextInput
            label={Strings.password_field_header}
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
          <Button
            style={[styles.card_button, { marginTop: 10 }]}
            mode="contained"
            icon="account"
            onPress={handleRegister}
            disabled={username==="" || email==="" || password===""}
          >
            {Strings.register_page_button}
          </Button>
          <Button
            style={styles.card_button}
            uppercase={false}
            onPress={handkeAllreadyHaveAccount}
          >
            <Text>
              {Strings.register_page_already_have_account} 
            </Text> 
            {Strings.login_page_button}
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
  card_title: {
    fontSize: 30,
    marginTop: 50,
    color: Colors.primary,
  },
  card_button: {
    margin: 7,
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
});

export default RegisterScreen;
