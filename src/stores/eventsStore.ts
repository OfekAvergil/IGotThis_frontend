import { makeAutoObservable } from "mobx";
import { formatDate } from "../common";

export interface event {
  title: string;
  date: string;
  content: string;
  startTime: string;
  endTime: string;
}

class EventsStore {
  events: any = {
    "2023-04-21": [
      {
        title: "Doctor Appointment",
        date: "2023-04-21",
        content: "I have a doctor appointment at 2:30pm",
        startTime: "2:30pm",
        endTime: "3:30pm",
      },
      {
        title: "Doctor Appointment",
        date: "2023-04-21",
        content: "I have a doctor appointment at 2:30pm",
        startTime: "12:30pm",
        endTime: "1:30pm",
      },
    ],
    "2023-04-19": [
      {
        title: "Doctor Appointment",
        date: "2023-04-19",
        content: "I have a doctor appointment at 2:30pm",
        startTime: "11:00am",
        endTime: "3:30pm",
      },
    ],
  };
  isDialogVisible: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  addEvent(
    eventTitle: string,
    eventDate: string,
    eventContent: string,
    eventSatrtTime: string,
    eventEndTime: string
  ): void {
    if (!this.events[eventDate]) {
      this.events[eventDate] = [];
    }

    // Add the new event object to the array
    this.events[eventDate].push({
      title: eventTitle,
      date: eventDate,
      content: eventContent,
      startTime: eventSatrtTime,
      endTime: eventEndTime,
    });
  }

  get count(): number {
    return this.events.length;
  }

  setVisible(isVisible: boolean): void {
    this.isDialogVisible = isVisible;
  }

  getEventsDateList(): string[] {
    return Object.keys(this.events);
  }
  
}

const eventsStore = new EventsStore();
export default eventsStore;
