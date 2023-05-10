import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button, List, Card, IconButton } from "react-native-paper";
import { Colors } from "../consts";

export interface recorderProps {
  addNewRec: (record: string|null|undefined) => void;
  existedRecord?: string | null;
}

export default function Recorder(props: recorderProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [existUri, setUri] = useState<string | null | undefined>(props.existedRecord||null);
  // true if I'm recording right now
  const [isRecording, setIsRecording] = useState(false);
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

  async function stopRecording() {
    try {
      if (isRecording) {
        console.log("stop record");
        await recording?.stopAndUnloadAsync();
        setUri(recording?.getURI());

        props.addNewRec(recording?.getURI());
        setIsRecording(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function playRecording() {
    try {
      let uri;
      if(existUri) uri = existUri;
      else uri = recording?.getURI()
      const playbackObject = new Audio.Sound();
      await playbackObject.loadAsync({ uri: uri || "" });
      await playbackObject.playAsync();
    } catch (error) {
      console.log(error);
    }
  }

  function deleteRecording() {
    if(existUri) setUri(null)
    setRecording(null);
    props.addNewRec(null);
  }

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", paddingLeft: 10 }}
    >
      <Text style={{ fontSize: 16, paddingLeft: 2 }}>record</Text>
      <View
        style={{ flexDirection: "row", alignItems: "center", paddingLeft: 23 }}
      >
        <IconButton
          onPress={deleteRecording}
          icon="delete"
          mode="contained"
          disabled={existUri || (recording && !isRecording) ? false : true}
        ></IconButton>
        {!isRecording &&  (
          <IconButton
            onPress={startRecording}
            icon="microphone"
            mode="contained"
            style={styles.RecordButton}
            disabled={existUri ? true : false}
          ></IconButton>
        )}
        {isRecording && (
          <IconButton
            onPress={stopRecording}
            icon="stop"
            mode="contained"
            containerColor={Colors.primary}
            iconColor="#DCDCDC"
            style={styles.RecordButton}
          ></IconButton>
        )}
        <IconButton
          onPress={playRecording}
          icon="play"
          mode="contained"
          disabled={existUri || (recording && !isRecording) ? false : true}
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
