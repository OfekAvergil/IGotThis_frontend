import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text, Button, TextInput, Card, RadioButton } from "react-native-paper";
import userStore, { user } from "../../stores/userStore";
import LoginHeader from "../../components/LoginHeader";
import { Colors } from "../../consts";
import eventsStore from "../../stores/eventsStore";
import todosStore from "../../stores/todosStore";
import notesStore from "../../stores/notesStore";
import Icon from "react-native-paper/src/components/Icon";
import LoginError from "../../components/LoginError";
import { observer } from "mobx-react";

const InfoScreen = ({ navigation }: any) => {
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [role, setRole] = useState(false);
  const [checked, setChecked] = React.useState("first");
  const ObserverMessage = observer(LoginError);

  async function handleSave() {
    if (userStore.user) {
      const newUser: user = {
        user_name: userStore.user.user_name,
        password: userStore.user.password,
        mail: userStore.user.mail,
        isSuperviosr: role,
        homeAddress: address,
        contactNumber: contact,
      };
      await userStore.signupUser(newUser);
      if (userStore.secretKey) {
        userStore.setErrorMessage("");
        await eventsStore.fetchEvents(userStore.secretKey);
        await todosStore.fetchTodos(userStore.secretKey);
        await notesStore.fetchNotes(userStore.secretKey);
        navigation.navigate("Walkthrough");
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader header="Sign in" />
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.notes}>Which user is in this device?</Text>
          <View style={styles.section}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Button
                onPress={() => {
                  setChecked("first");
                  setRole(false);
                }}
                mode={checked === "first" ? "contained" : "outlined"}
                style={styles.RadioButton}
              >
                {/* <Icon source="face-man-outline" size={22} color="black" /> */}
                <Text style={styles.label}>Main User</Text>
              </Button>
              <Button
                onPress={() => {
                  setChecked("second");
                  setRole(false);
                }}
                mode={checked === "second" ? "contained" : "outlined"}
                style={styles.RadioButton}
              >
                {/* <Icon source="face-agent" size={24} color="black" /> */}
                <Text style={styles.label}>Supervisior</Text>
              </Button>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.notes}>Please fill in some details:</Text>
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
          <ObserverMessage />
          <View style={{ marginTop: 180, flexDirection: "row" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-start",
                flexDirection: "row",
              }}
            >
              <Button
                mode="outlined"
                icon="chevron-left"
                onPress={() => {
                  userStore.setErrorMessage("");
                  setAddress("");
                  setContact("");
                  navigation.navigate("Register");
                }}
              >
                Back
              </Button>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "flex-end",
                flexDirection: "row",
              }}
            >
              <Button mode="contained" icon="check" onPress={handleSave}>
                Done!
              </Button>
            </View>
          </View>
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
    flex: 3,
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
    margin: 7,
  },
  section: {
    marginBottom: 10,
  },
  notes: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 5,
  },
  label: {
    fontSize: 20,
    color: "black",
  },
  RadioButton: {
    height: 80,
    width: 175,
    color: "white",
    margin: 3,
    justifyContent: "center",
  },
});

export default InfoScreen;
