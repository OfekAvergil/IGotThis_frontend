import * as React from "react";
import CalendarEvents from "../../components/CalendarEvents";
import AddEventDialog from "../../dialogs/AddEventDialog";
import { observer } from "mobx-react";

const HomeScreen = () => {
  const ObservedCalendar = observer(CalendarEvents);
  const ObservedDialog = observer(AddEventDialog);

  return (
    <>
      <ObservedCalendar />
      <ObservedDialog />
    </>
  );
};

export default HomeScreen;
