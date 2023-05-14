import * as React from "react";
import CalendarEvents from "../../components/CalendarEvents";
import AddEventDialog from "../../dialogs/AddEventDialog";
import { observer } from "mobx-react";
import ShowEventDialog from "../../dialogs/ShowEventDialog";
import EditEventDialog from "../../dialogs/EditEventDialog";

const HomeScreen = () => {
  const ObservedCalendar = observer(CalendarEvents);
  const ObservedDialog = observer(AddEventDialog);
  const ObservedShowEvent = observer(ShowEventDialog);
  const ObservedEditEvent = observer(EditEventDialog);

  return (
    <>
      <ObservedCalendar />
      <ObservedDialog />
      <ObservedShowEvent />
      <ObservedEditEvent/>
    </>
  );
};

export default HomeScreen;
