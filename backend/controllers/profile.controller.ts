import { RequestExtended } from "../middleware/verifyAuth";
import { NextFunction, Response } from "express";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import { ParticipationStatus } from "@prisma/client";

export const profileSavedData = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: loggedInUserId,
      },
    });

    if (!user || !user.institutionId) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "User not found",
        404,
        true,
      );
    }

    // find all events that the user has saved
    const eventResponses = await prisma.userEventResponse.findMany({
      where: {
        userId: loggedInUserId,
        participationStatus: ParticipationStatus.Interested,
      },
      include: {
        event: {
          include: {
            location: true,
          },
        },
      },
    });

    const events = eventResponses
      .map((eventResponse) => eventResponse.event)
      .map((event) => {
        return {
          id: event.id,
          title: event.title,
          location: event.location.name,
          image: event.image,
          time: event.startTime,
          event: true,
        };
      });

    res.status(200).json({
      message: "Saved events",
      data: [
        {
          id: "1",
          title: "Saved Events",
          items: events,
        },
        {
          id: "2",
          title: "Saved Posts",
          items: [],
        },
        {
          id: "3",
          title: "Saved Items",
          items: [],
        },
      ],
    });
  } catch (error) {
    next(error);
  }
};
