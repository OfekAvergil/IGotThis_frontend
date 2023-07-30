import * as React from "react";
import { TextInput } from "react-native-paper";
import notesStore from "../stores/notesStore";
import BasicDialog from "./BaseDialog";
import { StyleSheet, View } from "react-native";
import todosStore, { TodoDialogs } from "../stores/todosStore";
import { Colors, Strings } from "../consts";


const EditTodoDialog = () => {
  const [content, setContent] = React.useState("");
  
  React.useEffect(()=>{
    if(todosStore.selectedTodo){
      setContent(todosStore.selectedTodo.content)
    }
  }, [todosStore.selectedTodo])

  return BasicDialog({
    title: Strings.edit_task_header,
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <TextInput
            label={Strings.task_field_header}
            value={content}
            onChangeText={(content) => setContent(content)}
            style={styles.input}
          />
        </View>
      </View>
    ),
    isVisible: todosStore.isDialogOpen(TodoDialogs.EditTodoDialog),
    enableActions: true,
    onOk: () => {
      todosStore.closeAllDialogs();
      todosStore.editTodo(todosStore.selectedTodo?.id||0 , content);
      todosStore.setSelectedTodo(null);
    },
    onCancle: () => {
      todosStore.closeAllDialogs();
      todosStore.setSelectedTodo(null);
    },
    onDismiss: () => {
      todosStore.closeAllDialogs();
      todosStore.setSelectedTodo(null);
    },
  });
};

export default EditTodoDialog;

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
  inputArea: {
    height: 200,
    borderColor: Colors.basicGrey,
    backgroundColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
});
