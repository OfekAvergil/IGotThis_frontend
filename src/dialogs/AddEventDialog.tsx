import * as React from "react";
import { Button, TextInput, Text, IconButton } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { Platform, StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import eventsStore, { EventsDialogs } from "../stores/eventsStore";
import todosStore from "../stores/todosStore";
import { Colors } from "../consts";


const AddEventDialog = () => {

  const [title, setTitle] = React.useState("");
  const [datePick, setDatePick] = React.useState(new Date());
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [content, setContent] = React.useState("");
  const [show, setShow] = React.useState(false); //show the date or time picker (boolean)
  const [mode, setMode] = React.useState("date"); //date or time picker (string)

  const isWeb = Platform.OS === "web";

  const clearModal = () => {
    setDatePick(new Date());
    setTitle("");
    setDateStart("");
    setDateEnd("");
    setContent("");
    setStartTime("08:00");
    setEndTime("08:30");
  };

  const onChange = (event: any, selectedDate: any) => {
    // if mode == date setDate, if mode == startTime setStartTime etc.
    if (mode == "dateStart") {
      const currentDate = selectedDate || dateStart;
      setShow(Platform.OS === "ios"); // ?
      let tempDate = new Date(currentDate).toISOString().slice(0, 10);
      setDateStart(tempDate);
      setShow(false);
    } else if (mode == "dateEnd"){
      const currentDate = selectedDate || dateStart;
      setShow(Platform.OS === "ios"); // ?
      let tempDate = new Date(currentDate).toISOString().slice(0, 10);
      setDateEnd(tempDate);
      setShow(false);
    }else if (mode == "startTime") {
      const currentDate = selectedDate || startTime;
      setShow(Platform.OS === "ios"); // ?
      let tempTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour24: true,
      });
      setStartTime(tempTime);
      setShow(false);
    } else if (mode == "endTime") {
      const currentDate = selectedDate || endTime;
      setShow(Platform.OS === "ios"); // ?
      let tempTime = currentDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour24: true,
      });
      setEndTime(tempTime);
      setShow(false);
    }
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  // to support adding event from todo
  React.useEffect(()=>{
    setTitle(todosStore.selectedTodo?.content || "")
  }, [todosStore.selectedTodo])

  // to support adding event at chosen date
  React.useEffect(()=>{
    setDateStart(eventsStore.selectedDate || "");
    setDateEnd(eventsStore.selectedDate || "")

  }, [eventsStore.selectedDate])

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
          {isWeb ? (
            <>
            <Text>
              start
            </Text>
            < View style={{flexDirection:"row"}}>
              <TextInput
                label={"date"}
                  value={dateStart}
                  onChangeText={(text) => setDateStart(text)}
                  style={styles.smallInput}
                />
                <TextInput
                label={"time"}
                style={styles.smallInput}
                value={startTime}
                onChangeText={(text) => setStartTime(text)}
              />
            </View>
             <Text>
              end:
              </Text> 
              <View style={{flexDirection:"row"}}>
              <TextInput
                  label={"date"}
                  style={styles.smallInput}
                  value={dateEnd}
                  onChangeText={(text) => setDateEnd(text)}
                />
              <TextInput
                label={"time"}
                style={styles.smallInput}
                value={endTime}
                onChangeText={(text) => setEndTime(text)}
              />
              </View>
            </>
          ) : (
            <>
                          <Text style={{marginBottom: 5}}>
                  starting date
                </Text>
              <View style={{flexDirection:"row"}}>
  
                <TextInput
                  label="date"
                  value={dateStart}
                  onChangeText={(dateStart) => setDateStart(dateStart)}
                  style={styles.input}
                  right= {<TextInput.Icon
                    icon="calendar"
                    onPress={() => showMode("dateStart")}/>}
                />
                <View style={styles.smallInput}>
                  <TextInput
                    label="hour"
                    value={endTime}
                    onChangeText={(startTime) => setStartTime(startTime)}
                    style={styles.input}
                    right= {<TextInput.Icon
                      icon="clock"
                      onPress={() => showMode("startTime")}/>}
                      />
                </View>
              </View>
              
              <Text style={{marginBottom: 5}}>
                  ending date
                </Text>
              <View style={{flexDirection:"row"}}>
     
                <TextInput
                  label="date"
                  value={dateEnd}
                  onChangeText={(dateEnd) => setDateEnd(dateEnd)}
                  style={styles.input}
                  right= {<TextInput.Icon
                    icon="calendar"
                    onPress={() => showMode("dateEnd")}/>}
                />
                <View style={styles.smallInput}>
                  <TextInput
                    label="hour"
                    value={endTime}
                    onChangeText={(endTime) => setEndTime(endTime)}
                    style={styles.input}
                  right= {<TextInput.Icon
                      icon="clock"
                      onPress={() => showMode("endTime")}/>}
                      />
                </View>
              </View>

              
            </>
          )}

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={datePick}
              mode={mode == "dateStart" || mode == "dateEnd" ? "date" : "time"} // if mode == date show date picker, if mode == time show time picker"}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <TextInput
            label="write some notes"
            value={content}
            onChangeText={(content) => setContent(content)}
            multiline={true}
            numberOfLines={3}
            style={styles.inputArea}
          />
        </View>
      </View>
    ),
    isVisible: eventsStore.isDialogOpen(EventsDialogs.AddEventDialog),
    enableActions: true,
    onOk: () => {
      eventsStore.closeAllDialogs();
      let notifyTimeFrame = "30";
      let newId = eventsStore.events.length + 1;
      eventsStore.addEvent(
        newId,
        title,
        dateStart,
        dateEnd,
        startTime,
        endTime,
        notifyTimeFrame,
        content
      );
      console.log(eventsStore.events);
      clearModal();
    },
    onCancle: () => {
      eventsStore.closeAllDialogs();
      clearModal();
    },
    onDismiss: () => {
      eventsStore.closeAllDialogs();
    },
  });
};

export default AddEventDialog;

const styles = StyleSheet.create({
  dialogContent: {
    backgroundColor: Colors.background,
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
    height: 150,
    borderColor: Colors.basicGrey,
    backgroundColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: "top",
  },
  smallInput: {
    height: 50,
    width:200,
    borderColor: Colors.basicGrey,
    backgroundColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginLeft:10,
  },
});
