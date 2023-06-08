import React, { Component, useState } from "react";
import userStore from "../stores/userStore";
import notesStore from "../stores/notesStore";
import todosStore from "../stores/todosStore";
import { set } from "mobx";

export async function handleExtractTasks() {
  const text = notesStore.textCurrentEventNote;
  if (text) {
    try {
      if (text == null) {
        throw new Error("Uh oh, no text was provided");
      }

    const response = await fetch("http://localhost:4005/tasks/extract-task", {
      method: "POST",
      headers: {
        Authorization: userStore.secretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

      const data = await response.json();
      const completion = data.message;
      // convert completion to list (complection = ["task1", "task2"])
      convertCompletionToList(completion);
    } catch (error) {
      console.error("Couldn't extract task", error);
    }
    notesStore.setTextCurrentEventNote(null);
  }
}
export async function handleSpeechToText() {
  const recording = notesStore.recordingCurrentEventNote;
  console.log("pathToAudioFile: ", recording);
  if (recording) {
    try {
      if (recording == null) {
        throw new Error("Uh oh, no path was provided");
      }

    const response = await fetch("http://localhost:4005/tasks/speech-to-text", {
      method: "POST",
      headers: {
        Authorization: userStore.secretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ path_to_audio: pathToAudioFile }),
    });

      const data = await response.json();
      const result = data.message;
      console.log("result: ", result);
      // convert completion to list (complection = ["task1", "task2"])
      convertCompletionToList(result);
    } catch (error) {
      console.error("Couldn't convert speech to text", error);
    }
    notesStore.setPathToAudioFile(null);
  }
}

function convertCompletionToList(completion) {
  // convert completion to list (complection = ["task1", "task2"])
  const tasks_list = JSON.parse(completion);
  console.log("tasks_list: ", tasks_list);
  for (let i = 0; i < tasks_list.length; i++) {
    console.log("task ", tasks_list[i]);
    todosStore.addTodo(tasks_list[i]);
  }
}
