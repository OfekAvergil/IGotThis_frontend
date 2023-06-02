import * as React from "react";
import { TextInput } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import todosStore, { TodoDialogs } from "../stores/todosStore";
import { Colors } from "../consts";

const AddTodoDialog = () => {
  const [content, setContent] = React.useState("");

  function clearModal(): void {
    setContent("");
  }

  return BasicDialog({
    title: "New Task",
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <TextInput
            label="task"
            value={content}
            onChangeText={(content) => setContent(content)}
            style={styles.input}
          />
        </View>
      </View>
    ),
    isVisible: todosStore.isDialogOpen(TodoDialogs.AddTodoDialog),
    enableActions: true,
    onOk: () => {
      console.log("ok");
      todosStore.closeAllDialogs();
      todosStore.addTodo(content);
      clearModal();
    },
    onCancle: () => {
      console.log("cancle");
      todosStore.closeAllDialogs();
      clearModal();
    },
    onDismiss: () => {
      todosStore.closeAllDialogs();
      clearModal();
    },
  });
};

export default AddTodoDialog;

const styles = StyleSheet.create({
  dialogContent: {
    backgroundColor: "white",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  form: {
    marginBottom: 15,
  },
  input: {
    height: 50,
    borderColor: Colors.basicGrey,
    backgroundColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
