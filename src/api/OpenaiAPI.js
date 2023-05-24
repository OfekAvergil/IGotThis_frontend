import React, { Component, useState } from "react";
import userStore from "../stores/userStore";
import { set } from "mobx";

export async function handleExtractTasks(text) {
  try {
    if (text == null) {
      throw new Error("Uh oh, no text was provided");
    }

    const response = await fetch("http://localhost:4005/extract-task", {
      method: "POST",
      headers: {
        Authorization: userStore.secretKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await response.json();
    const tasks_list = data.message;
    for (let i = 0; i < tasks_list.length; i++) {
      const task = tasks_list[i];
      console.log("task ", task);
      addTodo(task);
    }
  } catch (error) {
    console.error("Couldn't extract task", error);
    // Handle the error case as needed
  }
}
export async function handleSpeechToText(pathToAudioFile) {
  try {
    if (pathToAudioFile == null) {
      throw new Error("Uh oh, no path was provided");
    }

    const response = await fetch("http://localhost:4005/speech-to-text", {
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
