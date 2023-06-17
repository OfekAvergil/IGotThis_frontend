import { makeAutoObservable, runInAction } from "mobx";
import { formatDate } from "../common";
import userStore from "./userStore";
import { sendDelete, sendGet, sendPost, sendPut } from "../api/REST_Requests";

export interface note {
  id: number;
  name: string;
  creationDate: string;
  content: string;
  audio?: string;
}

export enum NotesDialogs {
  AddNoteDialog,
  ShowNoteDialog,
  EditNoteDialog,
}

const Route: string = "notes";

class NotesStore {
  notes: note[] = [];
  currentOpenDialog: NotesDialogs | null = null;
  selectedNote: note | null = null;
  textCurrentEventNote: string | null = null;
  recordingCurrentEventNote: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public fetchNotes = async (secretKey: string | null) => {
    try {
      const response = await sendGet(Route, secretKey);
      runInAction(async () => {
        this.notes = response.data.notes;
      });
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  public addNote = async (
    noteName: string,
    contentToSet: string,
    record?: string
  ) => {
    try {
      const now: Date = new Date();
      let newNote = {
        name: noteName,
        creationDate: formatDate(now),
        content: contentToSet,
        audio: record,
      };
      let newNotePushed = await sendPost(Route, newNote, userStore.secretKey);
      this.notes = [...this.notes, newNotePushed.data];
    } catch (error) {
      console.log(`Error in adding note: ${error}`);
    }
  };

  public deleteNote = async (noteId: number) => {
    try {
      let res = await sendDelete(Route, noteId, userStore.secretKey);
      this.notes = this.notes.filter((n) => n.id !== noteId);
    } catch (error) {
      console.log(`Error in deleting note: ${error}`);
    }
  };

  public deleteAll = async () => {
    this.notes.forEach((item) => {
      this.deleteNote(item.id);
    });
  };

  public editNote = async (
    noteId: number,
    noteName: string,
    contentToSet?: string,
    recording?: string
  ) => {
    try {
      const noteIndex = this.notes.findIndex((n) => n.id === noteId);
      if (noteIndex === -1) {
        throw new Error(`Note with ID ${noteId} not found`);
      }
      let res = await sendPut(
        Route,
        noteId,
        {
          name: noteName,
          content: contentToSet,
          audio: recording,
        },
        userStore.secretKey
      );
      this.notes[noteIndex].name = noteName;
      if (contentToSet) this.notes[noteIndex].content = contentToSet;
      if (recording) this.notes[noteIndex].audio = recording;
      this.notes = [...this.notes];
    } catch (error) {
      console.log(`Error in editing note: ${error}`);
    }
  };

  public get count(): number {
    return this.notes.length;
  }

  public isDialogOpen(dialog: NotesDialogs): boolean {
    return this.currentOpenDialog === dialog;
  }

  public openDialog(dialog: NotesDialogs): void {
    this.currentOpenDialog = dialog;
  }

  public closeAllDialogs(): void {
    this.currentOpenDialog = null;
  }

  public setSelectedNote(item: note | null): void {
    this.selectedNote = item;
  }

  setRecordingCurrentEventNote = (recording: string | null) => {
    this.recordingCurrentEventNote = recording;
  };

  setTextCurrentEventNote = (text: string | null) => {
    this.textCurrentEventNote = text;
  };
}

const notesStore = new NotesStore();
export default notesStore;
