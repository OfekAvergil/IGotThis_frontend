import userStore from "../stores/userStore";
import notesStore from "../stores/notesStore";
import todosStore from "../stores/todosStore";
import axios from "axios";
import * as FileSystem from "expo-file-system";

export async function handleExtractTasks() {
  const text = notesStore.textCurrentEventNote;
  const route = `tasks/extract-task`;
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
  try {
    const audioURI = notesStore.recordingCurrentEventNote;
    if (!audioURI) {
      console.error("Audio URI is null or undefined.");
      return;
    }

    const audioFile = await fetch(audioURI);
    let uriParts = audioURI.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("file", {
      audioURI,
      name: `audio.${fileType}`,
      type: `audio/x-${fileType}`,
    });

    const response = await FileSystem.uploadAsync(
      `http://192.168.1.236:4005/api/tasks/speech-to-text`,
      audioURI,
      {
        fieldName: "audio",
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response);
    console.log(response.body);
    const completion = response.body;
    convertCompletionToList(completion);
    notesStore.setRecordingCurrentEventNote(null);
  } catch (error) {
    console.error("Error sending audio to server:", error);
  }
}

function removeChars(inputString) {
  const charsToRemove = [ "\\n", "\n", '"', "[", "]", "{", "}", "\\", "'"];
  for (const char of charsToRemove) {
    inputString = inputString.split(char).join("");
  }
  return inputString;
}

/**
 * convert completion to seperated tasks (completion = ["task1", "task2"]),
 * and add them to the todos list
 * @param completion - array of tasks
 */
function convertCompletionToList(completion) {
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
    let task = removeChars(tasks_list[i]);
    console.log("task ", task);
    todosStore.addTodo(task);
  }
}
