import { makeAutoObservable, runInAction } from "mobx";
import axios, * as others from "axios";
import userStore from "./userStore";
import { toDo } from "./todosStore";
import { BASE_URL } from "../consts";
import * as Notifications from 'expo-notifications';


export interface event {
  id: string;
  title: string;
  dateStart: string;
  dateEnd: string;
  startTime: string;
  endTime: string;
  notifyTimeFrame: string;
  content: string;
  location?: string;
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
  currentEventId: number | string | undefined = 1;
  expoPushToken: string | undefined;

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

      await this.schedulePushNotification(newEvent)

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
        let eventIndex = this.events.findIndex((n) => n.id === newEvent.id);
        if (newEvent) this.events[eventIndex].tasks = tasks as toDo[];
      } catch (error) {
        console.error("Failed to add tasks to event:", error);
      }
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  public deleteEvent = async (eventId: string) => {
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
    eventId: string,
    eventTitle: string,
    eventDateStart: string,
    eventDateEnd: string,
    eventSatrtTime: string,
    eventEndTime: string,
    eventContent: string,
    eventLocation: string,
    eventTasks?: string[]
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
      let eventIdentifier = this.events[eventIndex].id
      await this.cancelSchedulePushNotification(eventIdentifier)
      await this.schedulePushNotification(this.events[eventIndex])
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

  public setCurrentEvent(id: string | undefined): void {
    this.currentEventId = id;
  }

  public findCurrentEvent(): event | undefined {
    if (this.currentEventId) {
      return this.events.find((item) => item.id === this.currentEventId);
    }
    return undefined;
  }

  public setExpoPushToken(token: string | undefined): void {
    this.expoPushToken = token;
  }

  public schedulePushNotification = async (event: event) => {
    const date = new Date(`${event.dateStart} ${event.startTime}`);
    const halfHour = (Number(event.notifyTimeFrame)) * 60 * 1000;
    const now = new Date();
    const secondsDiff = Math.floor((date.getTime() - halfHour - now.getTime()) / 1000);

    try {
      let notificationIdentifier = await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Event coming up',
          body: event.title,
          data: event,
        },
        trigger: { seconds: secondsDiff },
      });
      console.log('succes in scheduling event', notificationIdentifier)
      let resNotificationAddInServer = await axios.post(
        `${BASE_URL}/api/notifications`,
        notificationIdentifier,
        {
          headers: {
            Authorization: userStore.secretKey,
          },
        }
      );
    } catch (error) {
      console.log('error in scheduling event', error)
    }
  }


  public cancelSchedulePushNotification = async (eventId: string) => {
    try {
      let res = await axios.get(
        `${BASE_URL}/api/notifications?id=${eventId}`,
        {
          headers: {
            Authorization: userStore.secretKey,
          },
        }
      );
      let identifier = res.data;
      let cancelNotificationRes = await Notifications.cancelScheduledNotificationAsync(identifier);
      console.log('cancel event', cancelNotificationRes)

    } catch (error) {
      console.log(`Error in canceling event notification: ${error}`);
    }
  }
}

const eventsStore = new EventsStore();
export default eventsStore;
