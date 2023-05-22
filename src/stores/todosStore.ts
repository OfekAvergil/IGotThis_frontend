import { makeAutoObservable, runInAction } from "mobx";
import axios, * as others from 'axios';
import userStore from "./userStore";

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

    public fetchTodos = async (secretKey: string | null) => {
        try {
            console.log(secretKey)
            const response = await axios.get('http://localhost:4005/api/todos',{                headers: {
                Authorization: `${secretKey}` // Include the token in the Authorization header
            },}); // replace with your API endpoint
            runInAction(() => {
                this.tasks = response.data.todos; // assuming the API returns an array of notes
            });
        } catch (error) {
            // Handle error here
            console.error('Failed to fetch notes:', error);
        }
    }

    public addTodo = async ( contentToSet: string) => {
        try {
            let newTodo = {
                content: contentToSet,
            };
            let newTodoPushed = await axios.post(
                `http://localhost:4005/api/todos`, 
                newTodo,
                {
                headers: {
                        Authorization: userStore.secretKey 
                },
                }
            );         
            this.tasks = [...this.tasks, newTodoPushed.data];
        } catch (error) {
            console.log(`Error in adding note: ${error}`);
        }
    }

    public deleteTodo = async (todoId: number) => {
        try {
            let res = await axios.delete(`http://localhost:4005/api/todos?id=${todoId}`,{                
                headers: {
                Authorization: userStore.secretKey 
            },})
            this.tasks = this.tasks.filter((n) => n.id !== todoId);
        } catch (error) {
            console.log(`Error in deleting note: ${error}`);
        }
    }

    public editTodo =async (taskId:number, contentToSet: string) => {
        try {
            const todoIndex = this.tasks.findIndex((n) => n.id === taskId);
            if (todoIndex === -1) {
                throw new Error(`Note with ID ${taskId} not found`);
            }
            let res = await axios.put(
                `http://localhost:4005/api/notes?id=${taskId}`, 
                { 
                content: contentToSet, 
                },
                {
                headers: {
                    Authorization: userStore.secretKey 
                }
                }
            );
            this.tasks[todoIndex].content = contentToSet;
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