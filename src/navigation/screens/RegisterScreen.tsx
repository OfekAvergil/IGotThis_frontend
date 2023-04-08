import React, { useState } from "react";
import { View, Image, SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput } from "react-native-paper";
import userStore from "../../stores/userStore";

import { useNavigation } from "@react-navigation/native";

const RegisterScreen = () => {
  const navigation = useNavigation();

  const { user_name, user_password, setUser } = userStore;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleRegister = () => {
    setUser(username, password);
    setUsername("");
    setPassword("");
  };

  return (
    <SafeAreaView>
      <Image
        style={styles.logo}
        source={require("../../../assets/icon.png")}
        resizeMode="contain"
      />
      <Text variant="displayLarge">Register</Text>
      <TextInput
        placeholder="User name"
        value={username}
        onChangeText={setUsername}
        secureTextEntry={false}
        right={<TextInput.Icon icon="account" />}
        mode="outlined"
      />
      <TextInput
        placeholder="Eamil"
        value={email}
        onChangeText={setEmail}
        secureTextEntry={false}
        right={<TextInput.Icon icon="email" />}
        mode="outlined"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        right={<TextInput.Icon icon="eye" />}
        mode="outlined"
      />
      <TextInput
        placeholder="Repeat Password"
        value={passwordRepeat}
        onChangeText={setPasswordRepeat}
        secureTextEntry={true}
        right={<TextInput.Icon icon="eye" />}
        mode="outlined"
      />
      <Button mode="contained" icon="account" onPress={handleRegister}>
        Register
      </Button>
      <Button mode="contained" onPress={handleRegister}>
        Allready have an account? Login
      </Button>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  logo: {
    alignContent: "center",
    width: "70%",
    maxWidth: 300,
    maxHeight: 300,
  },
});

export default RegisterScreen;
