import * as React from "react";
import { View, Text } from "react-native";
import eventsStore from "../stores/eventsStore";
import { Modal, Portal } from "react-native-paper";
import { Provider } from "mobx-react";

const EventDetails = (selectedDay: string) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Provider>
      <Portal>
        <Modal visible>
          <Text>{eventsStore.events[selectedDay].title}</Text>
          <Text>{eventsStore.events[selectedDay].content}</Text>
          <Text>{eventsStore.events[selectedDay].date}</Text>
          <Text>{eventsStore.events[selectedDay].startTime}</Text>
          <Text>{eventsStore.events[selectedDay].endTime}</Text>
        </Modal>
      </Portal>
    </Provider>
  );
};

export default EventDetails;
