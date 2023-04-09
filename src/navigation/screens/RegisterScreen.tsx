import React, { useState } from "react";
import { View, Image, SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore from "../../stores/userStore";

import { useNavigation } from "@react-navigation/native";

const RegisterScreen = ({ navigation }: any) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const handleRegister = () => {
    userStore.setUser(username, password);
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
      <Card style={styles.card}>
        <Card.Title titleStyle={styles.card_title} title="Register" />
        <Card.Content>
          <Image
            style={{
              width: 200,
              height: 200,
              alignSelf: "center",
              marginTop: 30,
            }}
            source={require("../../../assets/icon.png")}
            resizeMode="contain"
          />
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
            mode="outlined"
          />
          <TextInput
            placeholder="Confirm Password"
            value={passwordRepeat}
            onChangeText={setPasswordRepeat}
            secureTextEntry={true}
            right={<TextInput.Icon icon="eye-off-outline" />}
            mode="outlined"
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
            Allready have an account? Login
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
    fontSize: 30,
    marginTop: 50,
    color: "#E5517E",
  },
  card_button: {
    margin: 2,
  },
});

export default RegisterScreen;
