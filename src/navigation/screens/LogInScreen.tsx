import React, { useState } from "react";
import { View, Image, SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore from "../../stores/userStore";

const LogInScreen = ({ navigation }: any) => {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleLogIn = () => {
    userStore.setUser(inputUsername, inputPassword);
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
      <Card style={styles.card}>
        <Card.Title title="Login" titleStyle={styles.card_title} />
        <Card.Content>
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginTop: 50,
            }}
            source={require("../../../assets/icon.png")}
            resizeMode="contain"
          />
          <TextInput
            value={inputUsername}
            onChangeText={setInputUsername}
            placeholder="User name"
            secureTextEntry={false}
            right={<TextInput.Icon icon="account" />}
            mode="outlined"
          />
          <TextInput
            placeholder="Password"
            value={inputPassword}
            onChangeText={setInputPassword}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye" />}
            mode="outlined"
          />
          <Button
            style={styles.card_button}
            uppercase={false}
            onPress={handleForgotPassword}
          >
            {" "}
            Forgot password?{" "}
          </Button>
          <Button
            style={styles.card_button}
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
            {" "}
            Don't have an acount? Create one{" "}
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
    flexDirection: "row",
  },
  card: {
    width: "100%",
    height: "100%",
  },
  card_title: {
    marginTop: 50,
    color: "#E5517E",
    fontSize: 30,
  },
  card_button: {
    margin: 2,
  },
});

export default LogInScreen;
