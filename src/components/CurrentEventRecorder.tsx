import { Audio } from "expo-av";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";
import { Colors } from "../consts";
import React from "react";
import axios from "axios";
import { BASE_URL } from "../consts";
// import RNFS from 'react-native-fs';


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

        // Send the recorded audio to the server
        if (recording) {
          await sendAudioToServer(recording);
        }

        props.addNewRec(recording);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function sendAudioToServer(audioRecording: Audio.Recording): Promise<void> {
    try {
      const audioURI = audioRecording.getURI();

      if (!audioURI) {
        console.error("Audio URI is null or undefined.");
        return;
      }

      const audioFile = await fetch(audioURI);
      const audioData = await audioFile.blob();
      const filetype = audioURI.split(".").pop();
      const filename = audioURI.split("/").pop();
      console.log('File Name', audioFile);
      console.log('File Size', filename);

      // Create a FormData object to send the audio file as raw binary data
      const formData = new FormData();
      formData.append('audio', audioData, 'audio.mp3');



      const response = await axios.post(
        `http://192.168.1.198:4005/api/tasks/speech-to-text`,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
        
      );

      // console.log("Server response:", response.data);
    } catch (error) {
      console.error("Error sending audio to server:", error);
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

  // Helper function to convert Blob to Base64
  async function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
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

