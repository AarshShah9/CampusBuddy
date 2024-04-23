import type {
  ExpoPushMessage,
  ExpoPushTicket,
  ExpoPushToken,
} from "expo-server-sdk";
import { Expo } from "expo-server-sdk";
import prisma from "../prisma/client";
import { Event, UserEventResponse } from "@prisma/client";
import { calculateTimeDifference } from "../utils/timeFormater";
import { events, ids } from "../prisma/data";

// Create a new Expo SDK client
let expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: true, // Use the FCM v1 API
});

export type UserWithPushTokens = {
  id: string;
  pushTokens: string[];
};

export type EventWithResponses = {
  event: Event;
  responses: UserEventResponse[];
  usersWithPushTokens: UserWithPushTokens[];
};

export type SendPushNotificationProps = {
  title: string;
  body: string;
  data: Object;
  subtitle: string; // ios only
  sound: "default" | null; // ios only
  priority: "default" | "normal" | "high"; // ios only
  // could add other properties, see https://docs.expo.dev/push-notifications/sending-notifications/
};

// Sends batches of notifications to expo push notification service
export const sendPushNotifications = async (
  pushTokens: string[],
  pushNotificationProps: SendPushNotificationProps,
): Promise<ExpoPushTicket[]> => {
  // Create the messages to send to the clients
  let messages: ExpoPushMessage[] = [];
  for (let pushToken of pushTokens) {
    // Check that all the push tokens appear to be valid Expo push tokens
    if (!Expo.isExpoPushToken(pushToken)) {
      console.error(`Push token ${pushToken} is not a valid Expo push token`);
      continue;
    }

    // Construct a message
    messages.push({
      to: pushToken,
      ...pushNotificationProps,
    });
  }

  // Divide the array of push notification messages into appropriately sized chunks
  let chunks = expo.chunkPushNotifications(messages);

  let tickets: ExpoPushTicket[] = [];
  // Send the chunks to the Expo push notification service
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error("Error sending push notifications: ", error);
    }
  }

  return tickets;
};

// Later, after the Expo push notification service has delivered the
// notifications to Apple or Google (usually quickly, but allow the service
// up to 30 minutes when under load), a "receipt" for each notification is
// created. The receipts will be available for at least a day; stale receipts
// are deleted.
export const retrievePushReceipts = async (tickets: ExpoPushTicket[]) => {
  let receiptIds = [];
  for (let ticket of tickets) {
    // NOTE: Not all tickets have IDs; for example, tickets for notifications
    // that could not be enqueued will have error information and no receipt ID.
    if ("id" in ticket && ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  // Retrieve batches of receipts from the Expo service
  for (let chunk of receiptIdChunks) {
    try {
      let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
      console.log(receipts);

      // The receipts specify whether Apple or Google successfully received the
      // notification and information about an error, if one occurred.
      for (let [receiptId, receipt] of Object.entries(receipts)) {
        if (receipt.status === "ok") {
        } else if (receipt.status === "error") {
          console.error(
            `There was an error sending a notification: ${receipt.message}. RecieptId: ${receiptId}`,
          );
          if (receipt.details && receipt.details.error) {
            // The error codes are listed in the Expo documentation:
            // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            console.error(`The error code is ${receipt.details.error}`);
          }
        }
      }
    } catch (error) {
      console.error("Error retrieving push notification receipts: ", error);
    }
  }
};

export async function getEventsWithinTimeRange(
  fromTime: Date,
  toTime: Date,
): Promise<EventWithResponses[]> {
  const upcomingEvents = await prisma.event.findMany({
    where: {
      startTime: {
        gte: fromTime,
        lt: toTime,
      },
    },
    include: {
      eventResponses: {
        where: {
          participationStatus: "Going",
        },
        include: {
          user: {
            select: {
              id: true,
              pushTokens: true,
            },
          },
        },
      },
    },
  });

  const formattedEvents: EventWithResponses[] = upcomingEvents.map((event) => {
    const usersWithPushTokens: UserWithPushTokens[] = event.eventResponses.map(
      (response) => ({
        id: response.user.id,
        pushTokens: response.user.pushTokens.map(
          (pushToken) => pushToken.pushToken,
        ),
      }),
    );

    return {
      event,
      responses: event.eventResponses,
      usersWithPushTokens,
    };
  });

  return formattedEvents;
}

// Sends the formatted time before the event starts
function constructEventReminderNotification(
  event: EventWithResponses,
): SendPushNotificationProps {
  // Create a notification specific to this event
  let startsIn = "Starts in ";
  const timeDifference: string = calculateTimeDifference(event.event.startTime);
  if (timeDifference === "") {
    startsIn = "Event expired";
  } else {
    startsIn += timeDifference;
  }

  const pushNotificationProps: SendPushNotificationProps = {
    title: event.event.title,
    body: startsIn,
    data: {
      eventId: event.event.id,
    },
    subtitle: "",
    sound: "default",
    priority: "default",
  };

  return pushNotificationProps;
}

export async function sendEventNotifications(
  events: EventWithResponses[],
): Promise<ExpoPushTicket[]> {
  const tickets: ExpoPushTicket[] = [];

  // Iterate through each event
  for (const event of events) {
    const pushTokens: string[] = [];

    // Extract push tokens associated with users interested in this event
    for (const user of event.usersWithPushTokens) {
      pushTokens.push(...user.pushTokens);
    }

    // create the notification properties
    const pushNotificationProps = constructEventReminderNotification(event);

    // Send push notifications for this event
    try {
      const eventTickets = await sendPushNotifications(
        pushTokens,
        pushNotificationProps,
      );
      tickets.push(...eventTickets);
    } catch (error) {
      console.error(
        `Error sending push notifications for event ${event.event.id}:`,
        error,
      );
    }
  }

  return tickets;
}

// Function for sending a test notification to a single push token
export async function pushNotificationTest(token: ExpoPushToken) {
  await expo.sendPushNotificationsAsync([
    {
      to: token,
      title: events[0].title,
      body: "Event Coming Up Soon",
      subtitle: "",
      sound: "default",
      priority: "default",
      data: {
        route: true,
        routeName: "EventDetails",
        routeParams: {
          eventId: events[0].id,
        },
        imageUrl: events[0].image,
      },
    },
  ]);
}
