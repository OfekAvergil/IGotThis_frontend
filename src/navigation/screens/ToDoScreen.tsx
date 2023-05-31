import * as React from "react";
import TodoList from "../../components/TodoList";
import { observer } from "mobx-react";
import AddTodoDialog from "../../dialogs/AddTodoDialog";
import EditTodoDialog from "../../dialogs/EditTodoDialog";
import AddEventDialog from "../../dialogs/AddEventDialog";

export default function ToDoScreen() {
  const ObservedTodoList = observer(TodoList)
  const ObservedDialog = observer(AddTodoDialog)
  const ObservedEditDialog = observer(EditTodoDialog)
  const ObservedAddEventDialog = observer(AddEventDialog);
    return (
      <>
        <ObservedTodoList/>
        <ObservedDialog/>
        <ObservedEditDialog/>
        <ObservedAddEventDialog/>
      </>
    );
  }
