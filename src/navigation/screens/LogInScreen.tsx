import React, { useState } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore from "../../stores/userStore";
import LoginHeader from "../../components/LoginHeader";
import { Colors } from "../../consts";

const LogInScreen = ({ navigation }: any) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleLogIn = () => {
    userStore.loginUser(inputUsername, inputPassword);
    setInputUsername("");
    setInputPassword("");
    navigation.navigate("NavBar");
  };

  const handleForgotPassword = () => {};
  const handleLoginWithGoogle = () => {};

  const handleCreateAccount = () => { 
    setInputUsername("");
    setInputPassword("");
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader header="Login"/>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            value={inputUsername}
            onChangeText={setInputUsername}
            placeholder="User name"
            secureTextEntry={false}
            right={<TextInput.Icon icon="account" />}
          />
          <TextInput
            placeholder="Password"
            value={inputPassword}
            onChangeText={setInputPassword}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye" />}
          />
            <Button
              uppercase={false}
              onPress={handleForgotPassword}
              mode="text"
              labelStyle={{color: "grey", fontWeight:"400", fontSize: 12}}
              style={{width:150 ,marginLeft: -12,
            }}
            >
              Forgot password?
            </Button>
          
          <Button
            style={{}}
            mode="contained"
            icon="account"
            onPress={handleLogIn}
          >
            Login
          </Button>
          <Button
            style={styles.card_button}
            icon="google"
            onPress={handleLoginWithGoogle}
          >
            {" "}
            Login with Google
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
