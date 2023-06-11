import React, { Component, useState } from "react";
import userStore from "../stores/userStore";
import notesStore from "../stores/notesStore";
import todosStore from "../stores/todosStore";
import axios from "axios";

export async function handleExtractTasks() {
  const text = notesStore.textCurrentEventNote;
  if (text) {
    try {
      if (text == null) {
        throw new Error("Uh oh, no text was provided");
      }
      const response = await axios.post(
        `http://192.168.1.236:4005/api/tasks/extract-task`,
        { text: text },
        {
          headers: {
            Authorization: userStore.secretKey,
            //"Content-Type": "application/json",
          },
        }
      );

      const completion = await response.data;
      // convert completion to list (complection = ["task1", "task2"])
      convertCompletionToList(completion);
    } catch (error) {
      console.error("Couldn't extract task", error);
    }
    notesStore.setTextCurrentEventNote(null);
  }
}
export async function handleSpeechToText() {
  const path_to_audio_uri = notesStore.recordingCurrentEventNote;
  console.log("pathToAudioFile: ", path_to_audio_uri);
  if (path_to_audio_uri) {
    try {
      if (path_to_audio_uri == null) {
        throw new Error("Uh oh, no path was provided");
      }

      const response = await axios.post(
        `http://192.168.1.236:4005/api/tasks/speech-to-text`,
        { path_to_audio_uri: path_to_audio_uri },
        {
          headers: {
            Authorization: userStore.secretKey,
            //"Content-Type": "application/json",
          },
        }
      );

      const data = await response.data;
      // convert completion to list (complection = ["task1", "task2"])
      convertCompletionToList(data);
    } catch (error) {
      console.error("Couldn't convert speech to text", error);
    }
    notesStore.setRecordingCurrentEventNote(null);
  }
}

function convertCompletionToList(completion) {
  // convert completion to list (complection = ["task1", "task2"])
  // Remove the leading and trailing newline characters
  var cleanedText = completion.trim();
  // Remove the surrounding square brackets
  var withoutBrackets = cleanedText.slice(1, -1);
  // Split the remaining string by commas to get an array of strings
  var arrayOfStrings = withoutBrackets.split(",");
  // Trim each string to remove any leading or trailing whitespace
  var tasks_list = arrayOfStrings.map(function (str) {
    return str.trim();
  });
  //const tasks_list = JSON.parse(completion);
  console.log("tasks_list: ", tasks_list);
  for (let i = 0; i < tasks_list.length; i++) {
    console.log("task ", tasks_list[i]);
    todosStore.addTodo(tasks_list[i]);
  }
}
