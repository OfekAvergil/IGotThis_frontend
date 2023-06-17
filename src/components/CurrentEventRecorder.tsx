import { Audio } from "expo-av";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { Colors } from "../consts";
import React from "react";

export interface recorderProps {
  addNewRec: (record: Audio.Recording | null) => void;
}

export default function EventRecorder(props: recorderProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  // true if I'm recording
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  async function startRecording() {
    try {
      const newRecording: Audio.Recording = new Audio.Recording();
      console.log("start recording");
      await newRecording.prepareToRecordAsync(
        Audio.RecordingOptionsPresets.LOW_QUALITY
      );
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function stopRecording():Promise<void> {
    try {
      if (isRecording) {
        console.log("stop record");
        await recording?.stopAndUnloadAsync();
        props.addNewRec(recording);
        setIsRecording(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function playRecording():Promise<void> {
    try {
      const recordingUri = recording?.getURI();
      const playbackObject = new Audio.Sound();
      await playbackObject.loadAsync({ uri: recordingUri || "" });
      await playbackObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  function deleteRecording(): void {
    setRecording(null);
    props.addNewRec(recording);
  }



  async function continueRecording() :Promise<void> {
    await recording?.startAsync;
    setIsPaused(false);
  }

  return (
    <View
      style={{  alignItems: "center", justifyContent:"center" }}
    >
      
      {(!isRecording || isPaused) && (
        <IconButton
          onPress={isPaused? continueRecording: startRecording}
          icon="microphone"
          mode="contained"
          style={styles.RecordButton}
          size={50}
        ></IconButton>
      )}
      {isRecording && !isPaused  &&(
        <IconButton
          icon="microphone"
          mode="contained"
          containerColor={Colors.primary}
          iconColor="#DCDCDC"
          style={styles.RecordButton}
          size={50}
        ></IconButton>
      )}
      <View style={{flexDirection: "row",}}>
      <IconButton
        onPress={playRecording}
        icon="play"
        mode="contained"
        disabled={recording && !isRecording ? false : true}
      ></IconButton>
      <IconButton
        onPress={stopRecording}
        icon="stop"
        mode="contained"
        disabled={recording ? false : true}
      ></IconButton>
      <IconButton
        onPress={deleteRecording}
        icon="restart"
        mode="contained"
        disabled={recording && !isRecording ? false : true}
      ></IconButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  RecordButton: {
    width: 150,
    height: 150,
    borderRadius: 100,
    iconHeight: 40,
    iconWidth: 40,
  },
});
