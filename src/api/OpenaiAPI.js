import React, { Component, useState } from "react";
import userStore from "../stores/userStore";
import notesStore from "../stores/notesStore";
import todosStore from "../stores/todosStore";
import { set } from "mobx";

export async function handleExtractTasks() {
  const text = notesStore.textCurrentEventNote;
  console.log("text: ", text);
  try {
    if (text == null) {
      throw new Error("Uh oh, no text was provided");
    }

    const response = await fetch("http://192.168.62.170:4005/extract-task", {
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
    const tasks_list = JSON.parse(completion);
    console.log("tasks_list: ", tasks_list);
    for (let i = 0; i < tasks_list.length; i++) {
      console.log("task ", tasks_list[i]);
      todosStore.addTodo(tasks_list[i]);
    }
  } catch (error) {
    console.error("Couldn't extract task", error);
    // Handle the error case as needed
  }
  notesStore.setTextCurrentEventNote(null);
}
export async function handleSpeechToText() {
  try {
    if (pathToAudioFile == null) {
      throw new Error("Uh oh, no path was provided");
    }

    const response = await fetch("http://192.168.62.170:4005/speech-to-text", {
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
  } catch (error) {
    console.error("Couldn't convert speech to text", error);
    // Handle the error case as needed
  }
}
