import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { RequestExtended } from "../middleware/verifyAuth";
import {
  ChatNotificationSchema,
  IdParamSchema,
  PushTokenSchema,
} from "../../shared/zodSchemas";
import {
  EventWithResponses,
  sendEventNotifications,
  getEventsWithinTimeRange,
  pushNotificationTest,
  SendPushNotificationProps,
  sendPushNotifications,
  getUserPushTokens,
  timeDiffNotificationBody,
} from "../services/pushNotification.service";
import { ExpoPushTicket, ExpoPushToken } from "expo-server-sdk";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { AppError, AppErrorName } from "../utils/AppError";

export const testNotification = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pushToken: ExpoPushToken = PushTokenSchema.parse(
      req.params,
    ).pushToken;
    pushNotificationTest(pushToken);
    res.status(200).json({
      success: true,
      message: "Push notification sent...",
    });
  } catch (error: any) {
    next(error);
  }
};

export const storePushToken = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;
    const { pushToken } = PushTokenSchema.parse(req.body);
    console.log("expoPushToken: ", pushToken);

    // Create a new push token for the user
    await prisma.pushToken.create({
      data: {
        pushToken,
        userId: loggedInUserId!,
      },
    });

    res.status(200).json({
      success: true,
      message: "Push Token stored successfully",
    });
  } catch (error: any) {
    // handle unique constraint violation (assuming unique constraint on userId & pushToken)
    if (
      error instanceof PrismaClientKnownRequestError &&
      error.code == "P2002" // unique constrained violation error code
    ) {
      return res.status(409).json({
        success: false,
        error: "Push token already exists for this user",
      });
    } else {
      // Handle unexpected errors
      next(error);
    }
  }
};

export const sendUpcomingEventRemindersTest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // send notification for events happening in less than 12 hours but no fewer than 6 hours from now
    const scheduleIntervalInMinutes: number = 6 * 60;
    const reminderOffsetInMinutes: number = 12 * 60; // Approximately how long before an event starts to send notification
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
    );

    const upcomingEventsWithResponses: EventWithResponses[] =
      await getEventsWithinTimeRange(fromTime, toTime);

    if (upcomingEventsWithResponses.length === 0) {
      console.log("No upcoming events");
      res.status(200).json({
        success: true,
        message: "No upcoming events",
      });
      return;
    }

    const tickets: ExpoPushTicket[] = await sendEventNotifications(
      upcomingEventsWithResponses,
    );
    res.status(200).json({
      success: true,
      message: "Upcoming event reminder notifications sent",
    });
  } catch (error: any) {
    next(error);
  }
};

export const sendChatNotification = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;
    const { recipientId, message } = ChatNotificationSchema.parse(req.body);

    // get the recipient's registered push tokens
    const pushTokens = await getUserPushTokens(recipientId);

    // User does not have any registered push tokens
    if (pushTokens.length === 0) {
      return res
        .status(200)
        .json({ message: "Notification processing successful" });
    }

    // get sending user's name
    const user = await prisma.user.findUnique({
      where: { id: loggedInUserId },
      select: {
        firstName: true,
        lastName: true,
      },
    });
    if (!user) {
      // this should never happen
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "User not found",
        404,
        true,
      );
    }
    // construct the notification
    const pushNotification: SendPushNotificationProps = {
      title: `${user.firstName} ${user.lastName}`,
      body: message,
    };

    // const tickets: ExpoPushTicket[] = [];
    // send the notification
    const tickets: ExpoPushTicket[] = await sendPushNotifications(
      pushTokens,
      pushNotification,
    );

    res.status(202).json({
      success: true,
      message: "Message notifications sent",
    });
  } catch (error: any) {
    next(error);
  }
};

// send reminder for any event
export const sendEventRemindersTest = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const eventId = IdParamSchema.parse(req.params).id;

    const upcomingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
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
    console.log("upcomingEvent", upcomingEvent);

    if (!upcomingEvent) {
      console.log("Event not found");
      res.status(404).json({
        success: true,
        message: "Event not found",
      });
      return;
    }

    const usersWithPushTokens = upcomingEvent.eventResponses.map(
      (response) => ({
        id: response.user.id,
        pushTokens: response.user.pushTokens.map(
          (pushToken) => pushToken.pushToken,
        ),
      }),
    );

    const formattedEvent = {
      event: upcomingEvent,
      responses: upcomingEvent.eventResponses,
      usersWithPushTokens,
    };

    const tickets: ExpoPushTicket[] = await sendEventNotifications([
      formattedEvent,
    ]);
    res.status(200).json({
      success: true,
      message: "Upcoming event reminder notifications sent",
    });
  } catch (error: any) {
    next(error);
  }
};

// controller to send an event notification during the final showcase
export const sendShowcaseNotification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const pushToken = ""; // insert the device's push token
    const eventId = "79bc4af1-c551-11ee-83fd-6f8d6c450910"; // spikeball eventId
    // const eventTitle = "Spikeball 4 Cause";

    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Event not found! notification not sent",
        404,
        true,
      );
    }
    const startsIn = timeDiffNotificationBody(event.startTime);
    const notification: SendPushNotificationProps = {
      title: event.title,
      body: startsIn,
      data: {
        page: "EventDetails",
        id: eventId,
      },
      subtitle: "",
      sound: "default",
      priority: "default",
    };

    try {
      const eventTickets = await sendPushNotifications(
        [pushToken],
        notification,
      );
    } catch (error) {
      console.error(`Error sending push notifications for event`, error);
      return res.status(500).json({
        message: `Error sending push notifications for event`,
      });
    }
    res.status(200).json({
      success: true,
      message: `Showcase notifications sent for event`,
    });
  } catch (error: any) {
    next(error);
  }
};
