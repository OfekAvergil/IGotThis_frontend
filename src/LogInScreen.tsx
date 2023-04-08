import React, { useState } from "react";
import {View, Image, SafeAreaView, StyleSheet} from 'react-native'
import { Text, Button } from "react-native-paper";
import CustomInput from "./components/CustomInput";
import userStore from "./stores/userStore";

const LogInScreen = () => {
  const { user_name, user_password, setUser } = userStore;
  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleLogIn = () => {
    setUser(inputUsername, inputPassword);
    setInputUsername("");
    setInputPassword("");
  };

  const handleForgotPassword = () => {};
  const handleLoginWithGoogle = () => {};

  const handleLogout = () => {
    setUser(null, null);
  };

  return (
    <SafeAreaView style={styles.root}>
      <Image
        source={require("../assets/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <CustomInput
        placeholder="User name"
        value={inputUsername}
        setValue={setInputUsername}
        isSecure={false}
      />
      <CustomInput
        placeholder="Password"
        value={inputPassword}
        setValue={setInputPassword}
        isSecure={true}
      />
      <Button mode="contained" icon="account" onPress={handleLogIn}>
        Login
      </Button>
      <Button mode="contained"  onPress={handleForgotPassword}> Forgot password? </Button>
      <Button mode="contained" icon="google" onPress={handleLoginWithGoogle}> Login with Google</Button>
      <Button mode="contained"  onPress={handleForgotPassword}> Don't have an acount? Create one </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
});

export default LogInScreen;
