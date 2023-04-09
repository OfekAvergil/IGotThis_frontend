import { makeAutoObservable } from "mobx";
import { formatDate } from "../common";

export interface note{
    name: string;
    creationDate: string;
    content: string;
    audio?: any;
}

export enum NotesDialogs{
    AddNoteDialog,
    ShowNoteDialog,
}

class NotesStore{
    notes: note[] = [
        {
            name: "note1",
            creationDate: "21/10/2222",
            content: "hey I just metu"
        },
        {
            name: "note2",
            creationDate: "21/10/2222",
            content: "hey I just metu"
        },
        {
            name: "note3",
            creationDate: "21/10/2222",
            content: "hey I just metu"
        }
    ];
    currentOpenDialog: NotesDialogs | null = null;
    selectedNote: note  = this.notes[0];

    constructor(){
        makeAutoObservable(this);
    }
    
    public setNotes(notes: note[]): void{
        this.notes = notes;
    }
    
    public addNote(noteName: string, contentToSet: string): void{
        const now: Date = new Date();
        this.notes = [...this.notes,
        {
            name: noteName,
            creationDate: formatDate(now),
            content: contentToSet,
        }
        ];
    }

    public get count(): number{
        return this.notes.length;
    }

    public isDialogOpen(dialog: NotesDialogs): boolean {
        return this.currentOpenDialog === dialog;
    }

    public openDialog(dialog: NotesDialogs): void{
        this.currentOpenDialog = dialog;
    }

    public closeAllDialogs(): void{
        this.currentOpenDialog = null;
    }

    public setSelectedNote(item: note): void{
        this.selectedNote = item;
    }

}

const notesStore = new NotesStore();
export default notesStore;