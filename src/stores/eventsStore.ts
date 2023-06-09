import { makeAutoObservable, runInAction } from "mobx";
import axios, * as others from "axios";
import userStore from "./userStore";
import { toDo } from "./todosStore";
import { BASE_URL } from "../consts";

export interface event {
  id: number;
  title: string;
  dateStart: string;
  dateEnd: string;
  startTime: string;
  endTime: string;
  notifyTimeFrame: string;
  content: string;
  location?: string;
  tasks: eventTask[];
}

export interface eventTask {
  content: string;
  isDone: boolean;
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
      const response = await axios.get(`${BASE_URL}/api/events`, {
        headers: {
          Authorization: `${secretKey}`, // Include the token in the Authorization header
        },
      }); // replace with your API endpoint
      console.log("response.data.events", response.data.events);
      runInAction(() => {
        this.events = response.data.events; // assuming the API returns an array of events
      });
    } catch (error) {
      // Handle error here
      console.error("Failed to fetch events:", error);
    }
  };

  public addEvent = async (
    eventTitle: string,
    eventDateStart: string,
    eventDateEnd: string,
    eventSatrtTime: string,
    eventEndTime: string,
    eventNotifyTimeFrame: string,
    eventContent: string,
    eventLocation: string
  ) => {
    try {
      // Add the new event object to the array
      let newEventData = {
        title: eventTitle,
        dateStart: eventDateStart,
        dateEnd: eventDateEnd,
        startTime: eventSatrtTime,
        endTime: eventEndTime,
        notifyTimeFrame: eventNotifyTimeFrame,
        content: eventContent,
        location: eventLocation,
      };
      let res = await axios.post(
        `${BASE_URL}/api/events`,
        newEventData,
        {
          headers: {
            Authorization: userStore.secretKey,
          },
        }
      );

      let newEvent = {
        id: res.data.id,
        title: res.data.title,
        dateStart: res.data.dateStart,
        dateEnd: res.data.dateEnd,
        startTime: res.data.startTime,
        endTime: res.data.endTime,
        notifyTimeFrame: res.data.notifyTimeFrame,
        content: res.data.content,
        location: res.data.location,
        tasks: [], // epmty todo array
      };
      this.events.push(newEvent);
      // update the event with the tasks (api with chatgpt).
      try {
        let id = newEvent.id;
        let res = await axios.put(
          `${BASE_URL}/api/events/addTasks?id=${id}`,
          id,
          {
            headers: {
              Authorization: userStore.secretKey,
            },
          },
        );
        let tasks = res.data;
        console.log("hey", tasks);
        let eventIndex = this.events.findIndex((n) => n.id === newEvent.id);
        if (newEvent) this.events[eventIndex].tasks = this.convertStringToTasks(tasks);
      } catch (error) {
        console.error("Failed to add tasks to event:", error);
      }
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  public deleteEvent = async (eventId: number) => {
    try {
      let res = await axios.delete(
        `${BASE_URL}/api/events?id=${eventId}`,
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
    eventLocation: string,
    eventTasks?: eventTask[]
  ) => {
    try {
      console.log("eventId", eventId);
      const eventIndex = this.events.findIndex((n) => n.id === eventId);
      if (eventIndex === -1) {
        throw new Error(`Event with ID ${eventId} not found`);
      }
      let res = await axios.put(
        `${BASE_URL}/api/events?id=${eventId}`,
        {
          title: eventTitle,
          dateStart: eventDateStart,
          dateEnd: eventDateEnd,
          startTime: eventSatrtTime,
          endTime: eventEndTime,
          content: eventContent,
          location: eventLocation,
        },
        {
          headers: {
            Authorization: userStore.secretKey,
          },
        }
      );

      this.events[eventIndex].title = res.data.title;
      this.events[eventIndex].dateStart = res.data.dateStart;
      this.events[eventIndex].dateEnd = res.data.dateEnd;
      this.events[eventIndex].startTime = res.data.satrtTime;
      this.events[eventIndex].endTime = res.data.endTime;
      this.events[eventIndex].content = res.data.content;
      this.events[eventIndex].location = res.data.location;
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

  private convertStringToTasks(str: string): eventTask[]{
    const lines = str.split('\n'); // Split the string by newline characters
    const tasks: eventTask[] = [];
  
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim(); // Remove leading/trailing whitespaces
  
      if (line.length > 0) {
        // Ignore empty lines
        const taskNumberMatch = line.match(/^\d+\./); // Check if the line starts with a number followed by a dot
  
        if (taskNumberMatch) {
          const content = line.slice(taskNumberMatch[0].length).trim(); // Extract the content after the task number
          const task = {
            content,
            isDone: false,
          };
          tasks.push(task);
        }
      }
    }
    console.log("completion ", tasks);
    return tasks;
  };
}

const eventsStore = new EventsStore();
export default eventsStore;
