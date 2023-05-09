import React, { useState } from "react";
import { View, Image, SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore from "../../stores/userStore";

import { useNavigation } from "@react-navigation/native";
import LoginHeader from "../../components/LoginHeader";
import { Colors } from "../../consts";

const RegisterScreen = ({ navigation }: any) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleRegister = () => {
    userStore.signupUser(username, password, email, false);
    setUsername("");
    setPassword("");
    setEmail("");
    setPasswordRepeat("");
    navigation.navigate("NavBar");
  };

  const handkeAllreadyHaveAccount = () => {
    setUsername("");
    setPassword("");
    setEmail("");
    setPasswordRepeat("");
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader header="Sign in"/>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            placeholder="User name"
            value={username}
            onChangeText={setUsername}
            secureTextEntry={false}
            right={<TextInput.Icon icon="account" />}
            mode="outlined"
          />
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
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
            right={<TextInput.Icon icon="eye-off-outline" />}
          />
          <TextInput
            placeholder="Confirm Password"
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye-off-outline" />}
          />
          <Button
            style={[styles.card_button, { marginTop: 10 }]}
            mode="contained"
            icon="account"
            onPress={handleRegister}
          >
            Register
          </Button>
          <Button
            style={styles.card_button}
            icon="google"
            onPress={handleRegister}
          >
            Register with Google
          </Button>
          <Button
            style={styles.card_button}
            uppercase={false}
            onPress={handkeAllreadyHaveAccount}
          >
            <Text>
              Allready have an account?  
            </Text> 
            Login
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
});

export default RegisterScreen;
