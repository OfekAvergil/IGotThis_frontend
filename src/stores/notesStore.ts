import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";

export interface note{
    name: string;
    creationDate: Date;
    content: string;
    audio?: any;
}

class NotesStore{
    notes: note[] = [];

    constructor(){
        makeAutoObservable(this);
    }
    
    addNote(noteName: string){
        this.notes = [...this.notes,
        {
            name: noteName,
            creationDate: new Date(),
            content: "",
        }
        ];
    }

    get count(){
        return this.notes.length;
    }
}

const notesStore = new NotesStore();
export default notesStore;