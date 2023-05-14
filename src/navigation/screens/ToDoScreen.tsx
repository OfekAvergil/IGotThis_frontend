import * as React from "react";
import { View, Text } from "react-native";
import TodoList from "../../components/TodoList";
import { observer } from "mobx-react";
import AddTodoDialog from "../../dialogs/AddTodoDialog";
import EditTodoDialog from "../../dialogs/EditTodoDialog";

export default function ToDoScreen() {
  const ObservedTodoList = observer(TodoList)
  const ObservedDialog = observer(AddTodoDialog)
  const ObservedEditDialog = observer(EditTodoDialog)
    return (
      <>
        <ObservedTodoList/>
        <ObservedDialog/>
        <ObservedEditDialog/>
      </>
    );
  }
