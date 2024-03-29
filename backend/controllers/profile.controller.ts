import { RequestExtended } from "../middleware/verifyAuth";
import { NextFunction, Response } from "express";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import { ParticipationStatus } from "@prisma/client";
import { IdParamSchema } from "../../shared/zodSchemas";
import { userEventResponses } from "../prisma/data";

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

export const getUserProfileData = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = IdParamSchema.parse(req.params).id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        enrollments: {
          include: {
            program: {
              select: {
                programName: true,
              },
            },
          },
        },
      },
    });

    // find the amount of events the user has attended (participationStatus = Going, and endDate is in the past) inside the userEventResponse table
    const attendedEvents = await prisma.userEventResponse.count({
      where: {
        userId: userId,
        participationStatus: ParticipationStatus.Going,
        event: {
          endTime: {
            lte: new Date(),
          },
        },
      },
    });

    // find the number of organizations the user is a member of
    const orgs = await prisma.userOrganizationRole.count({
      where: {
        userId: userId,
        role: {
          roleName: "Member",
        },
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

    res.status(200).json({
      message: "User Profile Data",
      data: {
        user: {
          name: user.firstName + " " + user.lastName,
          image: user.profilePic,
          programs: user.enrollments.map(
            (enrollment) => enrollment.program.programName,
          ),
          attended: attendedEvents,
          following: orgs,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileEvents = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = IdParamSchema.parse(req.params).id;
    const self = req.userId === userId;

    // get all events that user has or is going to attend, include the isPublic false only if the user is viewing their own profile (thus self is true)
    const events = await prisma.userEventResponse.findMany({
      where: {
        userId: userId,
        participationStatus: ParticipationStatus.Going,
        event: {
          isPublic: self ? true : undefined,
        },
      },
      include: {
        event: {
          include: {
            location: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    // filter the events into two arrays, one for attending events in the future and one for past events
    const mappedEvents = events
      .map((eventResponse) => eventResponse.event)
      .map((event) => {
        return {
          id: event.id,
          title: event.title,
          time: event.startTime,
          endTime: event.endTime,
          location: event.location.name,
          host: event.organizationId,
          image: event.image,
          event: true,
        };
      });

    const attendingEvents = mappedEvents.filter(
      (event) => new Date(event.endTime) > new Date(),
    );
    const pastEvents = mappedEvents.filter(
      (event) => new Date(event.endTime) <= new Date(),
    );

    return res.status(200).json({
      message: "Profile Events",
      data: [
        {
          id: "1",
          title: "Attending Events",
          items: attendingEvents,
        },
        {
          id: "2",
          title: "Past Events",
          items: pastEvents,
        },
      ],
    });
  } catch (error) {
    next(error);
  }
};