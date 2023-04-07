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

    constructor(){
        makeAutoObservable(this);
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
}

const notesStore = new NotesStore();
export default notesStore;