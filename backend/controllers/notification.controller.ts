import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { RequestExtended } from "../middleware/verifyAuth";
import { PushTokenSchema } from "../../shared/zodSchemas";
import {
  EventWithResponses,
  createAndSendEventNotifications,
  getEventsWithinTimeDifference,
  pushNotificationTest,
} from "../services/pushNotification.service";
import { ExpoPushTicket, ExpoPushToken } from "expo-server-sdk";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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

// TODO: take tme parameter
export const sendUpcomingEventReminders = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const timeFrameInMinutes = 60 * 24; // event happening within 1 day
    const upcomingEventsWithResponses: EventWithResponses[] =
      await getEventsWithinTimeDifference(timeFrameInMinutes);

    if (upcomingEventsWithResponses.length === 0) {
      console.log("No upcoming events");
      res.status(200).json({
        success: true,
        message: "No upcoming events",
      });
      return;
    }

    const tickets: ExpoPushTicket[] = await createAndSendEventNotifications(
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

// export const getUpcomingEventsTest = async (
//   req: RequestExtended,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const timeFrameInMinutes: number = 60 * 24;
//     const currentTime = new Date();
//     const endTimeFrame = new Date(
//       currentTime.getTime() + timeFrameInMinutes * 60000,
//     );

//     const upcomingEvents = await prisma.event.findMany({
//       where: {
//         startTime: {
//           gte: currentTime,
//           lt: endTimeFrame,
//         },
//       },
//     });
//     res.status(200).json({ success: true, data: upcomingEvents });
//   } catch (error: any) {
//     next(error);
//   }
// };
