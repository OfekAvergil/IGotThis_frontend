import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore from "../../stores/userStore";
import LoginHeader from "../../components/LoginHeader";
import { Colors } from "../../consts";

const RegisterScreen = ({ navigation }: any) => {

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [displayError, setDisplayError] = useState(false);

  const handleRegister = () => {
    if(isPasswordsOk()){
      setDisplayError(false);
      userStore.setUser({
        user_name: username,
        password: password,
        mail: email,
        isSuperviosr: false
      })
      clearPage();
      navigation.navigate("Info");
    } else{
      setDisplayError(true);
    }
  };

  const handkeAllreadyHaveAccount = () => {
    clearPage();
    navigation.navigate("Login");
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
      <LoginHeader header="Sign in"/>
      <Card style={styles.card}>
        <Card.Content>
          <TextInput
            label="User name"
            value={username}
            onChangeText={setUsername}
            secureTextEntry={false}
            right={<TextInput.Icon icon="account" />}
            style={styles.input}
          />
          <TextInput
            label="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            secureTextEntry={false}
            right={<TextInput.Icon icon="email" />}
            style={styles.input}          />
          <TextInput
            label="Password"
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
          {displayError && (
          <View style={{ alignItems: "center", marginVertical:5}}>
              <Text style={{ color: Colors.pink }}>
                passwords do not match.
              </Text>
          </View>             
          )}
          <Button
            style={[styles.card_button, { marginTop: 10 }]}
            mode="contained"
            icon="account"
            onPress={handleRegister}
            disabled={username==="" || email==="" || password===""}
          >
            Register
          </Button>
          {/* <Button
            style={styles.card_button}
            icon="google"
            onPress={handleRegister}
          >
            Register with Google
          </Button> */}
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
