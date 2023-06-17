import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { Text, Button, Card } from "react-native-paper";
import userStore from "../../stores/userStore";
import LoginHeader from "../../components/LoginHeader";
import { Colors, Pages, Strings } from "../../consts";
import eventsStore from "../../stores/eventsStore";
import todosStore from "../../stores/todosStore";
import notesStore from "../../stores/notesStore";

const PickViewScreen = ({ navigation }: any) => {
  const [role, setRole] = useState(false);
  const [checked, setChecked] = React.useState("first");

  async function handleSave() {
    if (userStore.user) {
      userStore.setRole(role);
      if (userStore.secretKey) {
        await eventsStore.fetchEvents(userStore.secretKey);
        await todosStore.fetchTodos(userStore.secretKey);
        await notesStore.fetchNotes(userStore.secretKey);
        navigation.navigate(Pages.NavBar);
      }
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <LoginHeader header="Sign in"/>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.notes}>{Strings.select_user_header}</Text>
          <View style={styles.section}>
            <View style={{ flexDirection: "row", alignItems:"center"}}>
              <Button 
              onPress={() => {
                setChecked("first");
                setRole(false);
              }}
              mode= {checked==="first"? "contained" : "outlined"}
              style={styles.RadioButton}
              >
                {/* <Icon source="face-man-outline" size={22} color="black" /> */}
                <Text style={styles.label}>{Strings.main_user_title}</Text>
              </Button>
              <Button 
              onPress={() => {
                setChecked("second");
                setRole(true);
              }}
              mode= {checked==="second"? "contained" : "outlined"}
              style={styles.RadioButton}
              >
                {/* <Icon source="face-agent" size={24} color="black" /> */}
                <Text style={styles.label}>{Strings.supervisior_user_title}</Text>
              </Button>
            </View>
          </View>
          <View
            style={{  marginTop: 360, alignItems: "flex-end" }}
          >
          <Button
            mode="contained"
            icon="check"
            onPress={handleSave}
          >
           {Strings.done_button}
          </Button>
          </View>
        </Card.Content>
      </Card>
    </SafeAreaView>
  );
};

export default PickViewScreen;

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
    alignItems: "center",
    justifyContent:"center"
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
  section:{
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
    height:120,
    width:175,
    color: "white",
    margin:3,
    justifyContent:"center"
  }
});

