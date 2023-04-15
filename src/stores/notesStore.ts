import { makeAutoObservable, observable, action, runInAction } from "mobx";
import { formatDate } from "../common";
import axios, * as others from 'axios';

export interface note {
    name: string;
    creationDate: string;
    content: string;
    audio?: any;
}

export enum NotesDialogs {
    AddNoteDialog,
    ShowNoteDialog,
}


class NotesStore {
    notes: note[] = [];
    currentOpenDialog: NotesDialogs | null = null;
    selectedNote: note | null= null;

    constructor() {
        makeAutoObservable(this);
    }

    public setNotes(notes: note[]): void {
        this.notes = notes;
    }

    // public addNote(noteName: string, contentToSet: string): void{
    //     const now: Date = new Date();
    //     this.notes = [...this.notes,
    //     {
    //         name: noteName,
    //         creationDate: formatDate(now),
    //         content: contentToSet,
    //     }
    //     ];
    // }

    public fetchNotes = async (secretKey: string | null) => {
        try {
            console.log(secretKey)
            const response = await axios.get('http://localhost:4005/api/notes',{                headers: {
                Authorization: `${secretKey}` // Include the token in the Authorization header
            },}); // replace with your API endpoint
            runInAction(() => {
                this.notes = response.data.notes; // assuming the API returns an array of notes
            });
        } catch (error) {
            // Handle error here
            console.error('Failed to fetch notes:', error);
        }
    }

    public addNote = async (noteName: string, contentToSet: string) => {
        try {
            const now: Date = new Date();
            let newNote = {
                name: noteName,
                creationDate: formatDate(now),
                content: contentToSet,
                audio: '',
            };
            let newNotePushed = await axios.post(`http://localhost:4005/api/notes`, newNote);
            this.notes = [...this.notes, newNotePushed.data];
        } catch (error) {
            console.log(`Error in adding note: ${error}`);
        }
    }

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

    public setSelectedNote(item: note): void {
        this.selectedNote = item;
    }

}

const notesStore = new NotesStore();
export default notesStore;