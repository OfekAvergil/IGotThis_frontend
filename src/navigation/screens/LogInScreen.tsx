import React, { useState } from "react";
import { View, Image, SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import userStore from "../../stores/userStore";

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
    <SafeAreaView>
      <Image
        style={styles.logo}
        source={require('../../../assets/icon.png')}
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
      <Button mode="contained" icon="account" onPress={handleLogIn}>
        Login
      </Button>
      <Button mode="contained" onPress={handleForgotPassword}>
        {" "}
        Forgot password?{" "}
      </Button>
      <Button mode="contained" icon="google" onPress={handleLoginWithGoogle}>
        {" "}
        Login with Google
      </Button>
      <Button mode="contained" onPress={handleForgotPassword}>
        {" "}
        Don't have an acount? Create one{" "}
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
});

export default LogInScreen;
