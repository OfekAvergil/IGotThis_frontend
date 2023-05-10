import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, List, Card, IconButton } from "react-native-paper";
import { Colors } from "../consts";

export interface playerProps {
  recording?: string | null
}

export default function DialogPlayer(props: playerProps) {
  
  async function playRecording() {
    try {
      //const recordingUri = props.recording?.getURI();
      const playbackObject = new Audio.Sound();
      await playbackObject.loadAsync({ uri: props.recording || "" });
      await playbackObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}
    >
      <Text style={{ fontSize: 16, paddingLeft: 2 }}>play recording: </Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingLeft: 23 }}
      >
        
        <IconButton
          onPress={playRecording}
          icon="play"
          mode="contained"
          disabled={props.recording ? false : true}
        ></IconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  RecordButton: {
    width: 60,
    height: 60,
    borderRadius: 100,
  },
});
