import * as React from "react";
import CalendarEvents from "../../components/CalendarEvents";
import AddEventDialog from "../../dialogs/AddEventDialog";
import { observer } from "mobx-react";
import ShowEventDialog from "../../dialogs/ShowEventDialog";
import EditEventDialog from "../../dialogs/EditEventDialog";
import { View } from 'react-native';


const CalenderScreen = () => {
  const ObservedCalendar = observer(CalendarEvents);
  const ObservedDialog = observer(AddEventDialog);
  const ObservedShowEvent = observer(ShowEventDialog);
  const ObservedEditEvent = observer(EditEventDialog);

  return (
    <View >
      <ObservedCalendar />
      <ObservedDialog />
      <ObservedShowEvent />
      <ObservedEditEvent/>
    </View>
  );
};

export default CalenderScreen;


