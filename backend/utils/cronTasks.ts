import cron from "node-cron";
import { ExpoPushTicket } from "expo-server-sdk";
import {
  EventWithResponses,
  sendEventNotifications,
  getEventsWithinTimeRange,
} from "../services/pushNotification.service";

// Send out event reminders, repeats every hour
export const upcomingEventReminderTask = cron.schedule(
  "0 */1 * * *",
  () => {
    console.log("Running scheduled task to send event reminders every hour");
    const scheduleIntervalInMinutes: number = 1 * 60; // The should match cron schedule
    const reminderOffsetInMinutes: number = 6 * 60; // Approximately how long before an event starts to send notification
    if (scheduleIntervalInMinutes >= reminderOffsetInMinutes) {
      console.error(
        "Error sending event reminders: Invalid time interval or offset",
      );
      return;
    }
    const now = new Date();
    // toTime is the latest time before an event starts for which a notification will be sent out
    const toTime = new Date(now.getTime() + reminderOffsetInMinutes * 60000);
    const fromTime = new Date(
      toTime.getTime() - scheduleIntervalInMinutes * 60000,
    ); // to make sure we don't get any events from the previous check and send out multiple notifications for an event

    sendUpcomingEventReminders(fromTime, toTime);
  },
  { scheduled: false, name: "UpcomingEventReminderTask" },
);

export async function sendUpcomingEventReminders(fromTime: Date, toTime: Date) {
  // Fetch events
  const upcomingEventsWithResponses: EventWithResponses[] =
    await getEventsWithinTimeRange(fromTime, toTime);

  if (upcomingEventsWithResponses.length === 0) {
    console.log("No upcoming events to send notifications for");
    return;
  }

  // Send push notifications
  const tickets: ExpoPushTicket[] = await sendEventNotifications(
    upcomingEventsWithResponses,
  );
  console.log(`Upcoming event reminder notifications sent`);
}
