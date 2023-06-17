import userStore from "../stores/userStore";
import notesStore from "../stores/notesStore";
import todosStore from "../stores/todosStore";
import { sendPost } from "./REST_Requests";

export async function handleExtractTasks() {
  const text = notesStore.textCurrentEventNote;
  const route = `tasks/extract-task`;
  if (text) {
    try {
      const response = await sendPost(route, { text: text }, userStore.secretKey);
      const completion = await response.data;
      convertCompletionToList(completion);
    } catch (error) {
      console.error("Couldn't extract task", error);
    }
    notesStore.setTextCurrentEventNote(null);
  } else{
    console.error("Uh oh, no text was provided");
  }
}

export async function handleSpeechToText() {
  const path_to_audio_uri = notesStore.recordingCurrentEventNote;
  const path_to_audio_mp3 = convertToMp3(path_to_audio_uri);
  console.log("path_to_audio_mp3: ", path_to_audio_mp3);
  const route = `tasks/speech-to-text`;
  if (path_to_audio_mp3) {
    try {
      const response = await  sendPost(
        route, 
        { path_to_audio_mp3: path_to_audio_mp3 }, 
        userStore.secretKey);
      const data = response.data;
      convertCompletionToList(data);
    } catch (error) {
      console.error("Couldn't convert speech to text", error);
    }
    notesStore.setRecordingCurrentEventNote(null);
  } else {
    console.error("Uh oh, no recording was provided");
  }
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
    console.log("task ", tasks_list[i]);
    todosStore.addTodo(tasks_list[i]);
  }
}


/**
 * Helper function to convert an audio file from URI to ArrayBuffer
 */
function convertAudioToBuffer(uri) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", uri, true);
    xhr.responseType = "arraybuffer";

    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error("Failed to load audio file"));
      }
    };

    xhr.onerror = function () {
      reject(new Error("Failed to load audio file"));
    };

    xhr.send();
  });
}

/**
 * Helper function to encode an ArrayBuffer to MP3
 */
function encodeToMp3(buffer) {
  const mp3Encoder = new lamejs.Mp3Encoder(1, 44100, 128);
  const samples = new Int16Array(buffer);
  const sampleBlockSize = 1152;
  const mp3Data = [];

  for (let i = 0; i < samples.length; i += sampleBlockSize) {
    const left = samples.subarray(i, i + sampleBlockSize);
    const mp3buf = mp3Encoder.encodeBuffer(left);
    if (mp3buf.length > 0) {
      mp3Data.push(mp3buf);
    }
  }

  const mp3buf = mp3Encoder.flush();
  if (mp3buf.length > 0) {
    mp3Data.push(mp3buf);
  }

  const mergedMp3Data = new Uint8Array(
    mp3Data.reduce((acc, chunk) => acc.concat(chunk), [])
  );
  return mergedMp3Data.buffer;
}

/** 
 * Convert audio file from URI to MP3
 */ 
function convertToMp3(uri) {
  convertAudioToBuffer(uri)
    .then((audioBuffer) => {
      const mp3Buffer = encodeToMp3(audioBuffer);
      const mp3Blob = new Blob([mp3Buffer], { type: "audio/mp3" });

      // Use the mp3Blob as needed (e.g., download it or send it to the server)
      // For example, to download the converted file:
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(mp3Blob);
      downloadLink.download = "converted.mp3";
      downloadLink.click();
    })
    .catch((error) => {
      console.error("Failed to convert audio to MP3:", error);
    });
}