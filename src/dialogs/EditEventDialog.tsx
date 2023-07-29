import * as React from "react";
import { Button, TextInput, Text } from "react-native-paper";
import BasicDialog from "./BaseDialog";
import { Platform, StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import eventsStore, { EventsDialogs } from "../stores/eventsStore";
import { Colors, Strings } from "../consts";
import { parseTimeFromString } from "../common";

const EditEventDialog = () => {
  // selected event exists
  const [title, setTitle] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [content, setContent] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [mode, setMode] = React.useState<string | null>(null); //date or time picker

  React.useEffect(() => {
    if (eventsStore.selectedEvent) {
      setTitle(eventsStore.selectedEvent.title);
      setDateStart(eventsStore.selectedEvent.dateStart);
      setDateEnd(eventsStore.selectedEvent.dateEnd);
      setContent(eventsStore.selectedEvent.content || "");
      setLocation(eventsStore.selectedEvent.location || "");
      setStartTime(eventsStore.selectedEvent.startTime);
      setEndTime(eventsStore.selectedEvent.endTime);
    }
  }, [eventsStore.selectedEvent]);

  const isWeb = Platform.OS === "web";

  const clearModal = () => {
    eventsStore.setSelectedEvent(null);
    setTitle("");
    setDateStart("");
    setDateEnd("");
    setContent("");
    setStartTime("");
    setEndTime("");
  };

  const changeStartDate = (selectedDate: any) => {
    let tempDate = new Date(selectedDate).toISOString().slice(0, 10);
    setMode(null);
    setDateStart(tempDate);
    setDateEnd(tempDate);
  };

  const changeEndDate = (selectedDate: any) => {
    let tempDate = new Date(selectedDate).toISOString().slice(0, 10);
    setMode(null);
    setDateEnd(tempDate);
    //check if before start date
    const startDateObj = new Date(dateStart);
    const endDateObj = new Date(tempDate);
    if (endDateObj < startDateObj) {
      setDateStart(tempDate);
    }
  };

  const changeStartTime = (selectedDate: any) => {
    let tempTime = selectedDate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour24: true,
    });
    setMode(null);
    setStartTime(tempTime);
    setEndTime(tempTime);
  };

  const changeEndTime = (selectedDate: any) => {
      let tempTime = selectedDate.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour24: true,
      });
      setMode(null);
      setEndTime(tempTime);
  };

   /**
   * Check if the end time is earlier than the start time and both dates are the same
   * if so - move the end date to the next day
  */
   const ensureTimeLogic = () => {
    const startDateObj = new Date(dateStart);
    const endDateObj = new Date(dateEnd);
    const startTimeObj = parseTimeFromString(startTime);
    const endTimeObj = parseTimeFromString(endTime);
    if(endDateObj.getTime() === startDateObj.getTime() && endTimeObj < startTimeObj) {
      endDateObj.setDate(endDateObj.getDate() + 1);
      setDateEnd(endDateObj.toISOString().slice(0, 10));
    }
  }

  React.useEffect(() => {
    ensureTimeLogic();
  }, [endTime]);


  const startingDateFields = (
<View>
  <Text style={{ marginBottom: 5 }}>{Strings.starting_date_header}</Text>
  {/* for web users*/}
  {isWeb && 
      <View style={{ flexDirection: "row" }}>
        <TextInput
          label={Strings.date_field_header}
          value={dateStart}
          onChangeText={(text) => setDateStart(text)}
          style={styles.smallInput}
        />
        <TextInput
          label={Strings.time_field_header}
          style={styles.smallInput}
          value={startTime}
          onChangeText={(text) => setStartTime(text)}
        />
      </View>}
  {/* for android users*/}
  {!isWeb && 
    <View style={{ flexDirection: "row" }}>
      <TextInput
        label={Strings.date_field_header}
        value={dateStart}
        onChangeText={(dateStart) => setDateStart(dateStart)}
        style={styles.input}
        right={
          <TextInput.Icon
            icon="calendar"
            onPress={() => setMode("dateStart")}
          />
        }
      />
      <View>
        <TextInput
          label={Strings.time_field_header}
          value={startTime}
          onChangeText={(startTime) => setStartTime(startTime)}
          style={styles.smallInput}
          right={
            <TextInput.Icon
              icon="clock"
              onPress={() => setMode("startTime")}
            />
          }
        />
      </View>
    </View>}
  </View>);

  const endingDateFields = (
  <View>
    <Text style={{ marginBottom: 5 }}>{Strings.ending_date_header}</Text>
    {/* for web users*/}
    {isWeb && 
        <View style={{ flexDirection: "row" }}>
          <TextInput
            label={Strings.date_field_header}
            value={dateEnd}
            onChangeText={(text) => setDateEnd(text)}
            style={styles.smallInput}
          />
          <TextInput
            label={Strings.time_field_header}
            style={styles.smallInput}
            value={endTime}
            onChangeText={(text) => setEndTime(text)}
          />
        </View>}
    {/* for android users*/}
    {!isWeb && 
      <View style={{ flexDirection: "row" }}>
        <TextInput
          label={Strings.date_field_header}
          value={dateEnd}
          onChangeText={(dateEnd) => setDateEnd(dateEnd)}
          style={styles.input}
          right={
            <TextInput.Icon
              icon="calendar"
              onPress={() => setMode("dateEnd")}
            />
          }
        />
        <View>
          <TextInput
            label={Strings.time_field_header}
            value={endTime}
            onChangeText={(endTime) => setEndTime(endTime)}
            style={styles.smallInput}
            right={
              <TextInput.Icon
                icon="clock"
                onPress={() => setMode("endTime")}
              />
            }
          />
        </View>
      </View>}
  </View>);

  return BasicDialog({
    title: "Edit Event",
    content: (
      <View style={styles.dialogContent}>
        <View style={styles.form}>
          <TextInput
            label={Strings.title_field_header}
            value={title}
            onChangeText={(title) => setTitle(title)}
            style={styles.input}
          />
          {startingDateFields}
          {endingDateFields}
          <TextInput
            label={Strings.location_field_header}
            value={location}
            onChangeText={(location) => setLocation(location)}
            style={styles.input}
          />
          <TextInput
            label={Strings.content_field_header}
            value={content}
            onChangeText={(content) => setContent(content)}
            multiline={true}
            numberOfLines={5}
            style={styles.inputArea}
          />
        </View>
        { mode == "dateStart" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(dateStart)}
            mode={ "date" } 
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => changeStartDate(selectedDate)}
          />
        )}
        { mode == "dateEnd" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(dateEnd)}
            mode={ "date" } 
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => changeEndDate(selectedDate)}
          />
        )}
        { mode == "startTime" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={parseTimeFromString(startTime)}
            mode={ "time" } 
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => changeStartTime(selectedDate)}
          />
        )}
        { mode == "endTime" && (
          <DateTimePicker
            testID="dateTimePicker"
            value={parseTimeFromString(endTime)}
            mode={ "time" } 
            is24Hour={true}
            display="default"
            onChange={(event, selectedDate) => changeEndTime(selectedDate)}
          />
        )}
      </View>
    ),
    isVisible: eventsStore.isDialogOpen(EventsDialogs.EditEventDialog),
    enableActions: true,
    onOk: () => {
      eventsStore.closeAllDialogs();
      let id = eventsStore.selectedEvent ? eventsStore.selectedEvent.id : '-1';
      eventsStore.editEvent(
        id,
        title,
        dateStart,
        dateEnd,
        startTime,
        endTime,
        content,
        location
      );
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

export default EditEventDialog;

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
    width: 140,
    borderColor: Colors.basicGrey,
    backgroundColor: Colors.basicGrey,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
});
