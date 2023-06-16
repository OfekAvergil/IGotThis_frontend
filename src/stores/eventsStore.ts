import { makeAutoObservable, runInAction } from "mobx";
import axios, * as others from "axios";
import userStore from "./userStore";
import { BASE_URL, Strings } from "../consts";
import { sendDelete, sendGet, sendPost, sendPut } from "../api/REST_Requests";
import * as Notifications from "expo-notifications";

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
  tasks: eventTask[];
}

export interface notificationDoc {
  id?: string;
  user?: string;
  eventId?: string;
  content: object;
  trigger: object;
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

const Route: string = "events";

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
      const response = await sendGet(Route, secretKey);
      runInAction(() => {
        this.events = response.data.events;
      });
    } catch (error) {
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
      let res = await sendPost(Route, newEventData, userStore.secretKey);

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
        tasks: [], // empty todo array
      };
      this.events.push(newEvent);
      // update the event with the tasks (api with chatgpt).
      await this.schedulePushNotification(newEvent);
      try {
        let id = newEvent.id;
        let res = await sendPut(
          "/events/addTasks",
          id,
          id,
          userStore.secretKey
        );
        let tasks = res.data;
        let eventIndex = this.events.findIndex((n) => n.id === newEvent.id);
        if (newEvent)
          this.events[eventIndex].tasks = this.convertStringToTasks(tasks);
      } catch (error) {
        console.error("Failed to add tasks to event:", error);
      }
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  public deleteEvent = async (eventId: string) => {
    try {
      let res = await sendDelete(Route, eventId, userStore.secretKey);
      this.events = this.events.filter((n) => n.id !== eventId);
    } catch (error) {
      console.log(`Error in deleting event: ${error}`);
    }
  };

  public deleteAll = async () => {
    this.events.forEach((item) => {
      this.deleteEvent(item.id);
    });
  };

  public editEvent = async (
    eventId: string,
    eventTitle: string,
    eventDateStart: string,
    eventDateEnd: string,
    eventSatrtTime: string,
    eventEndTime: string,
    eventContent: string,
    eventLocation: string
  ) => {
    try {
      const eventIndex = this.events.findIndex((n) => n.id === eventId);
      if (eventIndex === -1) {
        throw new Error(`Event with ID ${eventId} not found`);
      }
      // update db
      let res = await sendPut(
        Route,
        eventId,
        {
          title: eventTitle,
          dateStart: eventDateStart,
          dateEnd: eventDateEnd,
          startTime: eventSatrtTime,
          endTime: eventEndTime,
          content: eventContent,
          location: eventLocation,
        },
        userStore.secretKey
      );
      // update store
      this.events[eventIndex].title = eventTitle;
      this.events[eventIndex].dateStart = eventDateStart;
      this.events[eventIndex].dateEnd = eventDateEnd;
      if (eventSatrtTime) this.events[eventIndex].dateEnd = eventSatrtTime;
      if (eventEndTime) this.events[eventIndex].dateEnd = eventEndTime;
      if (eventContent) this.events[eventIndex].dateEnd = eventContent;
      if (eventLocation) this.events[eventIndex].dateEnd = eventLocation;
      this.events = [...this.events];
      // update notifications
      let eventIdentifier = this.events[eventIndex].id;
      await this.cancelSchedulePushNotification(eventIdentifier);
      await this.schedulePushNotification(this.events[eventIndex]);
    } catch (error) {
      console.log(`Error in editing event: ${error}`);
    }
  };

  public getEventsByDate = (date: string): event[] => {
    return this.events.filter((n) => n.dateStart === date);
  };

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

  // @action
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
    const halfHour = Number(event.notifyTimeFrame) * 60 * 1000;
    const now = new Date();
    const secondsDiff = Math.floor(
      (date.getTime() - halfHour - now.getTime()) / 1000
    );

    try {
      let notificationDocument: notificationDoc = {
        content: {
          title: Strings.notification_header,
          body: event.title,
          data: event,
        },
        trigger: { seconds: secondsDiff },
      };

      let notificationIdentifier =
        await Notifications.scheduleNotificationAsync(notificationDocument);
      notificationDocument.id = notificationIdentifier;
      notificationDocument.eventId = event.id;
      console.log("succes in scheduling event", notificationIdentifier);
      let resNotificationAddInServer = await axios.post(
        `${BASE_URL}/api/notifications`,
        notificationDocument,
        {
          headers: {
            Authorization: userStore.secretKey,
          },
        }
      );
    } catch (error) {
      console.log("error in scheduling event", error);
    }
  };

  public cancelSchedulePushNotification = async (eventId: string) => {
    try {
      let res = await axios.delete(
        `${BASE_URL}/api/notifications?id=${eventId}`,
        {
          headers: {
            Authorization: userStore.secretKey,
          },
        }
      );

      if (res.data && res.data.id) {
        res = await axios.delete(
          `${BASE_URL}/api/notifications?id=${res.data.id}`,
          {
            headers: {
              Authorization: userStore.secretKey,
            },
          }
        );
        let cancelNotificationRes =
          await Notifications.cancelScheduledNotificationAsync(res.data.id);
        console.log("cancel event", cancelNotificationRes);
      } else {
        console.log(`Notification not found for event id: ${eventId}`);
      }
    } catch (error) {
      console.log(`Error in canceling event notification: ${error}`);
    }
  };

  private convertStringToTasks(str: string): eventTask[] {
    const lines = str.split("\n"); // Split the string by newline characters
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
  }
}

const eventsStore = new EventsStore();
export default eventsStore;
