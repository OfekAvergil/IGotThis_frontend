import { action, computed, makeAutoObservable, makeObservable, observable } from "mobx";

export interface note{
    name: string;
    creationDate: Date;
    content: string;
    audio?: any;
}

class NotesStore{
    notes: note[] = [];
    isDialogVisible: boolean = false;

    constructor(){
        makeAutoObservable(this);
    }
    
    addNote(noteName: string): void{
        console.log("here!");
        this.notes = [...this.notes,
        {
            name: noteName,
            creationDate: new Date(),
            content: "my note",
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