import React, { useState } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { Text, Button, TextInput, Card } from "react-native-paper";
import CurrentEventHeader from "../../components/CurrentEventHeader";
import { Audio } from "expo-av";
import { Colors } from "../../consts";
import EventRecorder from "../../components/CurrentEventRecorder";
const CurrentEventScreen = ({ navigation }: any) => {
  const [content, setContent] = React.useState("");
  const [recording, setRecording] = React.useState<Audio.Recording | null>(
    null
  );

  function handleExit(): void {}

  return (
    <SafeAreaView style={styles.container}>
      <CurrentEventHeader
        header="Appointment to Dr Ofek"
        hour="14:00-15:00"
        note="you are going to check your ears"
        handleExit={handleExit}
      />
      <Card style={styles.card}>
        <Card.Content>
          <View style={{ paddingTop: 20 }}>
            <Text style={{ color: "grey", padding: 10 }}>
              you can record the meeting
            </Text>
            <EventRecorder
              addNewRec={(record: Audio.Recording | null) => {
                setRecording(record);
              }}
            />
          </View>
          <View style={{ paddingTop: 40 }}>
            <Text style={{ color: "grey", padding: 10 }}>
              or take some notes
            </Text>
            <TextInput
              placeholder="write here..."
              value={content}
              onChangeText={(content) => setContent(content)}
              multiline={true}
              numberOfLines={5}
              style={styles.inputArea}
            />
          </View>
          <View
            style={{ width: "100%", paddingTop: 30, alignItems: "flex-end" }}
          >
            <Button
              style={{}}
              mode="contained"
              icon="check"
              onPress={handleExit}
            >
              Done!
            </Button>
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
    flex: 5,
  },
  card_title: {
    marginTop: 50,
    color: Colors.primary,
    fontSize: 30,
  },
  card_button: {
    margin: 7,
  },
  inputArea: {
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
});

export default CurrentEventScreen;
