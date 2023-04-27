import * as React from "react";
import { Button, TextInput } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { Platform, StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import eventsStore from "../stores/eventsStore";

const AddEventDialog = () => {
  const [title, setTitle] = React.useState("");
  const [datePick, setDatePick] = React.useState(new Date());
  const [date, setDate] = React.useState("");
  const [content, setContent] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [show, setShow] = React.useState(false); //show the date or time picker (boolean)
  const [mode, setMode] = React.useState("date"); //date or time picker (string)

  const onChange = (event: any, selectedDate: any) => {
    // if mode == date setDate, if mode == startTime setStartTime etc.
    if (mode == "date") {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === "ios"); // ?
      let tempDate = new Date(currentDate).toISOString().slice(0, 10);
      setDate(tempDate);
      setShow(false);
    } else if (mode == "startTime") {
      const currentDate = selectedDate || startTime;
      setShow(Platform.OS === "ios"); // ?
      let tempTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setStartTime(tempTime);
      setShow(false);
    } else if (mode == "endTime") {
      const currentDate = selectedDate || endTime;
      setShow(Platform.OS === "ios"); // ?
      let tempTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setEndTime(tempTime);
      setShow(false);
    }
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  return BasicDialog({
    title: "New Event",
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <TextInput
            label="title"
            value={title}
            onChangeText={(title) => setTitle(title)}
            style={styles.input}
          />
          <View style={{ margin: 10 }}>
            <Button
              icon="calendar"
              mode="contained"
              onPress={() => showMode("date")}
            >
              {date}
            </Button>
          </View>

          <View style={{ margin: 10 }}>
            <Button
              icon="clock"
              mode="contained"
              onPress={() => showMode("startTime")}
            >
              start time : {startTime}
            </Button>
          </View>
          <View style={{ margin: 10 }}>
            <Button
              icon="clock"
              mode="contained"
              onPress={() => showMode("endTime")}
            >
              end time : {endTime}
            </Button>
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={datePick}
              mode={mode == "date" ? "date" : "time"} // if mode == date show date picker, if mode == time show time picker"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <TextInput
            label="content"
            value={content}
            onChangeText={(content) => setContent(content)}
            multiline={true}
            numberOfLines={5}
            style={styles.inputArea}
          />
        </View>
      </View>
    ),
    isVisible: eventsStore.isDialogVisible,
    onOk: () => {
      eventsStore.setVisible(false);
      eventsStore.addEvent(title, date, content, startTime, endTime);
      console.log(eventsStore.events);
      setDatePick(new Date());
      setTitle("");
      setDate("");
      setContent("");
      setStartTime("");
      setEndTime("");
    },
    onCancle: () => {
      eventsStore.setVisible(false);
      setDatePick(new Date());
      setTitle("");
      setDate("");
      setContent("");
      setStartTime("");
      setEndTime("");
    },
    onDismiss: () => {
      eventsStore.setVisible(false);
    },
  });
};

export default AddEventDialog;

const styles = StyleSheet.create({
  dialogContent: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  form: {
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputArea: {
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
});
