import { makeAutoObservable, runInAction } from "mobx";
import userStore from "./userStore";
import { sendDelete, sendGet, sendPost, sendPut } from "../api/REST_Requests";

export interface toDo {
  id: number;
  content: string;
}

export enum TodoDialogs {
  AddTodoDialog,
  EditTodoDialog,
}

const Route: string = "todos";

class TodoStore {
  tasks: toDo[] = [];
  currentOpenDialog: TodoDialogs | null = null;
  selectedTodo: toDo | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  public fetchTodos = async (secretKey: string | null) => {
    try {
      const response = await sendGet(Route, secretKey);
      runInAction(async () => {
        this.tasks = response.data.todos;
      });
    } catch (error) {
      console.error("Failed to fetch notes:", error);
    }
  };

  public addTodo = async (contentToSet: string) => {
    try {
      let newTodo = {
        content: contentToSet,
      };
      let newTodoPushed = await sendPost(Route, newTodo, userStore.secretKey);
      runInAction(() => {
        this.tasks = [...this.tasks, newTodoPushed.data];
      });
    } catch (error) {
      console.log(`Error in adding note: ${error}`);
    }
  };

  public deleteTodo = async (todoId: number) => {
    try {
      let res = await sendDelete(Route, todoId, userStore.secretKey);
      runInAction(() => {
        this.tasks = this.tasks.filter((n) => n.id !== todoId);
      });
    } catch (error) {
      console.log(`Error in deleting note: ${error}`);
    }
  };

  public deleteAll = async () => {
    this.tasks.forEach((item) => {
      this.deleteTodo(item.id);
    });
  };

  public editTodo = async (taskId: number, contentToSet: string) => {
    try {
      const todoIndex = this.tasks.findIndex((n) => n.id === taskId);
      if (todoIndex === -1) {
        throw new Error(`Note with ID ${taskId} not found`);
      }
      let res = await sendPut(
        Route,
        taskId,
        {
          content: contentToSet,
        },
        userStore.secretKey
      );
      runInAction(() => {
        this.tasks[todoIndex].content = contentToSet;
        this.tasks = [...this.tasks];
      });
    } catch (error) {
      console.log(`Error in editing note: ${error}`);
    }
  };

  public isDialogOpen(dialog: TodoDialogs): boolean {
    return this.currentOpenDialog === dialog;
  }

  public openDialog(dialog: TodoDialogs): void {
    this.currentOpenDialog = dialog;
  }

  public closeAllDialogs(): void {
    this.currentOpenDialog = null;
  }

  public setSelectedTodo(item: toDo | null): void {
    this.selectedTodo = item;
  }
}

const todosStore = new TodoStore();
export default todosStore;
