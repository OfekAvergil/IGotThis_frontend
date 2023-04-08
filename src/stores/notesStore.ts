import { makeAutoObservable } from "mobx";
import { formatDate } from "../common";

export interface note{
    name: string;
    creationDate: string;
    content: string;
    audio?: any;
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
    isDialogVisible: boolean = false;
    isNoteOpen: boolean= false;
    selectedNote: note = {
        name: this.notes[0].name,
        content: this.notes[0].content,
        creationDate: this.notes[0].creationDate
    };

    constructor(){
        makeAutoObservable(this);
    }
    
    setNotes(notes: note[]): void{
        this.notes = notes;
    }
    
    addNote(noteName: string, contentToSet: string): void{
        const now: Date = new Date();
        this.notes = [...this.notes,
        {
            name: noteName,
            creationDate: formatDate(now),
            content: contentToSet,
        }
        ];
    }

    get count(): number{
        return this.notes.length;
    }

    setVisible(isVisible: boolean): void {
        this.isDialogVisible = isVisible;
    }

    openNote(isVisible: boolean): void {
        this.isNoteOpen = isVisible;
    }

    setSelectedNote(note: note): void {
        this.selectedNote = note;
    }
}

const notesStore = new NotesStore();
export default notesStore;