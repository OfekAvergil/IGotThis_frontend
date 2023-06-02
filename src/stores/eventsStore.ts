import { makeAutoObservable, runInAction } from "mobx";
import axios, * as others from "axios";
import userStore from "./userStore";
import { toDo } from "./todosStore";

export interface event {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  startTime: string;
  endTime: string;
  notifyTimeFrame: string;
  content: string;
  tasks: toDo[];
}

export enum EventsDialogs {
  AddEventDialog,
  ShowEventDialog,
  EditEventDialog,
  TasksFromEventDialog,
}

class EventsStore {
  events: event[] = [];
  currentOpenDialog: EventsDialogs | null = null;
  selectedEvent: event | null = null;
  selectedDate: string | null = null;
  currentEventId: number | undefined = 1;

  constructor() {
    makeAutoObservable(this);
  }

  public fetchEvents = async (secretKey: string | null) => {
    try {
      const response = await axios.get("http://192.168.62.170:4005/api/events", {
        headers: {
          Authorization: `${secretKey}`, // Include the token in the Authorization header
        },
      }); // replace with your API endpoint
      runInAction(() => {
        this.events = response.data.events; // assuming the API returns an array of events
      });
    } catch (error) {
      // Handle error here
      console.error("Failed to fetch events:", error);
    }
  };

  public addEvent = async (
    eventId: number,
    eventTitle: string,
    eventDateStart: string,
    eventDateEnd: string,
    eventSatrtTime: string,
    eventEndTime: string,
    eventNotifyTimeFrame: string,
    eventContent: string
  ) => {
    try {
      // Add the new event object to the array
      let newEvent = {
        id: eventId,
        title: eventTitle,
        dateStart: eventDateStart,
        dateEnd: eventDateEnd,
        startTime: eventSatrtTime,
        endTime: eventEndTime,
        notifyTimeFrame: eventNotifyTimeFrame,
        content: eventContent,
      };
      let newEventPushed = await axios.post(
        `http://192.168.62.170:4005/api/events`,
        newEvent,
        {
          headers: {
            Authorization: userStore.secretKey,
          },
        }
      );
      console.log("new event: ", newEventPushed.data);
      this.events.push(newEventPushed.data);
      console.log("events: ", this.events);
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  public deleteEvent = async (eventId: number) => {
    try {
      let res = await axios.delete(
        `http://192.168.62.170:4005/api/events?id=${eventId}`,
        {
          headers: {
            Authorization: userStore.secretKey,
          },
        }
      );
      this.events = this.events.filter((n) => n.id !== eventId);
    } catch (error) {
      console.log(`Error in deleting event: ${error}`);
    }
  };

  public editEvent = async (
    eventId: number,
    eventTitle: string,
    eventDateStart: string,
    eventDateEnd: string,
    eventSatrtTime: string,
    eventEndTime: string,
    eventContent: string,
    eventTasks: toDo[]
  ) => {
    try {
      const eventIndex = this.events.findIndex((n) => n.id === eventId);
      if (eventIndex === -1) {
        throw new Error(`Event with ID ${eventId} not found`);
      }
      let res = await axios.put(
        `http://192.168.62.170:4005/api/events?id=${eventId}`,
        {
          title: eventTitle,
          dateStart: eventDateStart,
          dateEnd: eventDateEnd,
          startTime: eventSatrtTime,
          endTime: eventEndTime,
          content: eventContent,
        },
        {
          headers: {
            Authorization: userStore.secretKey,
          },
        }
      );
      this.events[eventIndex].title = eventTitle;
      this.events[eventIndex].dateStart = eventDateStart;
      this.events[eventIndex].dateEnd = eventDateEnd;
      this.events[eventIndex].startTime = eventSatrtTime;
      this.events[eventIndex].endTime = eventEndTime;
      this.events[eventIndex].content = eventContent;
      this.events = [...this.events];
    } catch (error) {
      console.log(`Error in editing event: ${error}`);
    }
  };

  public getEventsByDate = (date: string): event[] => {
    return this.events.filter((n) => n.dateStart === date);
  };

  get count(): number {
    return this.events.length;
  }

  public isDialogOpen(dialog: EventsDialogs): boolean {
    return this.currentOpenDialog === dialog;
  }

  public openDialog(dialog: EventsDialogs): void {
    this.currentOpenDialog = dialog;
  }

  public closeAllDialogs(): void {
    this.currentOpenDialog = null;
  }
  getEventsDateListWithoutRange(): string[] {
    return [
      ...new Set(
        this.events
          .filter((item) => item.dateStart === item.dateEnd)
          .map((item) => item.dateStart)
      ),
    ];
  }
  getEventsDateListWithRange(): string[][] {
    return [
      ...new Set(
        this.events
          .filter((item) => item.dateStart !== item.dateEnd)
          .map((item) => [item.dateStart, item.dateEnd])
      ),
    ];
  }
  public setSelectedEvent(item: event): void {
    this.selectedEvent = item;
  }

  public setSelectedDate(date: string): void {
    this.selectedDate = date;
  }

  public setCurrentEvent(id: number | undefined): void {
    this.currentEventId = id;
  }

  public findCurrentEvent(): event | undefined {
    if (this.currentEventId) {
      return this.events.find((item) => item.id === this.currentEventId);
    }
    return undefined;
  }
}

const eventsStore = new EventsStore();
export default eventsStore;
