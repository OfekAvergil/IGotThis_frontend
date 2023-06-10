import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import userStore, { user } from "../../stores/userStore";
import LoginHeader from "../../components/LoginHeader";
import { Colors } from "../../consts";
import eventsStore from "../../stores/eventsStore";
import todosStore from "../../stores/todosStore";
import notesStore from "../../stores/notesStore";

const InfoScreen = ({ navigation }: any) => {
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");

  async function handleSave () {
    if(userStore.user){
      const newUser: user = {
        user_name: userStore.user.user_name,
        password: userStore.user.password,
        mail: userStore.user.mail,
        isSuperviosr: userStore.user.isSuperviosr,
        homeAddress: address,
        contactNumber: contact
      }
      await userStore.signupUser(newUser);
      if (userStore.secretKey) {
        await eventsStore.fetchEvents(userStore.secretKey);
        await todosStore.fetchTodos(userStore.secretKey);
        await notesStore.fetchNotes(userStore.secretKey);
      }
      navigation.navigate("NavBar");
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader header="Sign in"/>
      <Card style={styles.card}>
        <Card.Content>
          <View>
            <Text>
              Please tell us more about yourseld!
            </Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              label="Your home address"
              secureTextEntry={false}
              style={styles.input}
            />
            <TextInput
              value={contact}
              onChangeText={setContact}
              label="Emergency contact"
              secureTextEntry={false}
              style={styles.input}
            />
          </View>
          <Button
            style={{}}
            mode="contained"
            icon="check"
            onPress={handleSave}
          >
            Done!
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

export default InfoScreen;
