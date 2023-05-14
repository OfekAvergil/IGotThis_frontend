import { makeAutoObservable, observable, action, runInAction } from "mobx";
import { formatDate } from "../common";
import axios, * as others from 'axios';
import userStore from "./userStore";
import { Audio } from "expo-av";

export interface toDo {
    id: number;
    content: string;
}

export enum TodoDialogs {
    AddTodoDialog,
    EditTodoDialog,
}


class TodoStore {
    tasks: toDo[] = [
        {id: 1, content: "task 1111"}
    ];
    currentOpenDialog: TodoDialogs | null = null;
    selectedTodo: toDo | null= null;

    constructor() {
        makeAutoObservable(this);
    }

    public fetchNotes = async (secretKey: string | null) => {
        try {
            console.log(secretKey)
            const response = await axios.get('http://localhost:4005/api/notes',{                headers: {
                Authorization: `${secretKey}` // Include the token in the Authorization header
            },}); // replace with your API endpoint
            runInAction(() => {
                this.tasks = response.data.notes; // assuming the API returns an array of notes
            });
        } catch (error) {
            // Handle error here
            console.error('Failed to fetch notes:', error);
        }
    }

    public addNote = async (noteName: string, contentToSet: string, record?: string) => {
        try {
            const now: Date = new Date();
            let newNote = {
                name: noteName,
                creationDate: formatDate(now),
                content: contentToSet,
                audio: record,
            };
            let newNotePushed = await axios.post(
                `http://localhost:4005/api/notes`, 
                newNote,
                {
                headers: {
                        Authorization: userStore.secretKey 
                },
                }
            );         
            this.tasks = [...this.tasks, newNotePushed.data];
        } catch (error) {
            console.log(`Error in adding note: ${error}`);
        }
    }

    public deleteNote = async (noteId: number) => {
        try {
            let res = await axios.delete(`http://localhost:4005/api/notes?id=${noteId}`,{                
                headers: {
                Authorization: userStore.secretKey 
            },})
            this.tasks = this.tasks.filter((n) => n.id !== noteId);
        } catch (error) {
            console.log(`Error in deleting note: ${error}`);
        }
    }

    public editNote =async (noteId:number, noteName: string, contentToSet?: string, recording?: string) => {
        try {
            const noteIndex = this.tasks.findIndex((n) => n.id === noteId);
            if (noteIndex === -1) {
                throw new Error(`Note with ID ${noteId} not found`);
            }
            let res = await axios.put(
                `http://localhost:4005/api/notes?id=${noteId}`, 
                { 
                name: noteName, 
                content: contentToSet, 
                audio: recording
                },
                {
                headers: {
                    Authorization: userStore.secretKey 
                }
                }
            );
            if(contentToSet) this.tasks[noteIndex].content = contentToSet;
            this.tasks = [...this.tasks];
        } catch (error) {
            console.log(`Error in editing note: ${error}`);
        }
        
    }

    public isDialogOpen(dialog: TodoDialogs): boolean {
        return this.currentOpenDialog === dialog;
    }

    public openDialog(dialog: TodoDialogs): void {
        this.currentOpenDialog = dialog;
    }

    public closeAllDialogs(): void {
        this.currentOpenDialog = null;
    }

    public setSelectedTodo(item: toDo|null): void {
        this.selectedTodo = item;
    }

}

const todosStore = new TodoStore();
export default todosStore;