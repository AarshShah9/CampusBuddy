import {
  AppPermissionName,
  EventStatus,
  ParticipationStatus,
  State,
} from "@prisma/client";
import {
  CursorPaginationDatetimeParams,
  CursorPaginationDatetimeSchema,
  EventCreateSchema,
  EventUpdateSchema,
  IdParamSchema,
} from "../../shared/zodSchemas";
import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import { checkUserPermission } from "../utils/checkUserPermission";
import UploadToS3, {
  deleteFromS3,
  generateUniqueFileName,
} from "../utils/S3Uploader";
import { RequestExtended } from "../middleware/verifyAuth";
import {
  getCoordinatesFromPlaceId,
  getDistanceFromLatLonInKm,
  getPlaceNameFromPlaceId,
} from "../utils/googleMapsApi";
import { defaultDistance } from "../constants";
import { sampleEventData } from "../prisma/dummyData";
import { moderateText } from "../utils/moderateText";

// test Event
export const eventTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Event endpoint works" });
};

// Create new Event
export const createVerifiedEvent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;
    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;

    // Validate the Event data with zod schema
    const validatedEventData = EventCreateSchema.parse(req.body);

    // Check if the user has permission to create an event
    const hasPermission = await checkUserPermission(
      loggedInUserId!,
      organizationId,
      AppPermissionName.CREATE_EVENTS,
    );
    if (!hasPermission) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to create event`,
        403,
        true,
      );
    }

    if (!req.file) {
      throw new AppError(
        AppErrorName.FILE_UPLOAD_ERROR,
        "No file uploaded.",
        400,
        true,
      );
    }

    // Start a transaction
    const newEvent = await prisma.$transaction(async (prisma) => {
      // Create a verified event for an organization using the google maps api

      const existingLocation = await prisma.location.findUnique({
        where: {
          placeId: validatedEventData.locationPlaceId,
        },
      });

      if (!existingLocation) {
        const { lat, lng } = await getCoordinatesFromPlaceId(
          validatedEventData.locationPlaceId,
        );
        const name = await getPlaceNameFromPlaceId(
          validatedEventData.locationPlaceId,
        );
        const location = await prisma.location.create({
          data: {
            latitude: lat,
            longitude: lng,
            placeId: validatedEventData.locationPlaceId,
            name: name,
          },
        });
      }

      // moderation stuff for events
      const isFlagged = await moderateText(
        validatedEventData.title,
        validatedEventData.description,
      );

      // TODO add tags to event
      const event = await prisma.event.create({
        data: {
          startTime: validatedEventData.startTime,
          endTime: validatedEventData.endTime,
          title: validatedEventData.title,
          description: validatedEventData.description,
          locationPlaceId: validatedEventData.locationPlaceId,
          organizationId,
          userId: loggedInUserId!,
          status: EventStatus.Verified,
          isPublic: !isFlagged,
          isFlagged: isFlagged,
        },
      });

      const uniqueFileName = generateUniqueFileName(
        req.file!.originalname,
        event.id,
      );
      const path = `images/events/${uniqueFileName}`;
      await UploadToS3(req.file!, path);

      // Update event with image path after successful upload
      return prisma.event.update({
        where: { id: event.id },
        data: {
          image: path,
        },
      });
    });

    // Event created successfully
    res.status(201).json({
      message: "Event created successfully",
      data: newEvent,
    });
  } catch (error: any) {
    // hand error over to error handling middleware
    next(error);
  }
};

// Create new Event
export const createEvent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    // Validate the Event data
    const validatedEventData = EventCreateSchema.parse(req.body);

    if (!req.file) {
      throw new AppError(
        AppErrorName.FILE_UPLOAD_ERROR,
        "No file uploaded.",
        400,
        true,
      );
    }

    // Start a transaction
    const newEvent = await prisma.$transaction(async (prisma) => {
      // create event
      // Create a verified event for an organization using the google maps api
      const existingLocation = await prisma.location.findUnique({
        where: {
          placeId: validatedEventData.locationPlaceId,
        },
      });

      if (!existingLocation) {
        const { lat, lng } = await getCoordinatesFromPlaceId(
          validatedEventData.locationPlaceId,
        );
        const name = await getPlaceNameFromPlaceId(
          validatedEventData.locationPlaceId,
        );
        const location = await prisma.location.create({
          data: {
            latitude: lat,
            longitude: lng,
            placeId: validatedEventData.locationPlaceId,
            name: name,
          },
        });
      }

      // moderation stuff for events
      const isFlagged = await moderateText(
        validatedEventData.title,
        validatedEventData.description,
      );

      // TODO add tags to event
      const event = await prisma.event.create({
        data: {
          startTime: validatedEventData.startTime,
          endTime: validatedEventData.endTime,
          title: validatedEventData.title,
          description: validatedEventData.description,
          locationPlaceId: validatedEventData.locationPlaceId,
          userId: loggedInUserId!,
          status: EventStatus.NonVerified,
          isPublic: !isFlagged,
          isFlagged: isFlagged,
        },
      });

      const uniqueFileName = generateUniqueFileName(
        req.file!.originalname,
        event.id,
      );
      const path = `images/events/${uniqueFileName}`;

      await UploadToS3(req.file!, path);

      // Update event with image path after successful upload
      return prisma.event.update({
        where: { id: event.id },
        data: {
          image: path,
        },
      });
    });

    if (newEvent) {
      // Event created successfully
      res.status(201).json({
        message: "Event created successfully",
        data: newEvent,
      });
    } else {
      // Throw an error if the event creation returned an empty result
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Event creation returned empty result.",
        500,
        true,
      );
    }
  } catch (error: any) {
    // hand error over to error handling middleware
    next(error);
  }
};

// Update Event
export const updateEvent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    // Validate request id param
    const eventId = IdParamSchema.parse(req.params).id;

    // Validate event data
    const validatedUpdateEventData = EventUpdateSchema.parse(req.body);

    // get the event from the database
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!existingEvent) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Event with id ${eventId} not found`,
        404,
        true,
      );
    }

    // Check if the user has permission to update the event details
    const isCreatedByUser: boolean = existingEvent.userId === loggedInUserId;
    let hasPermission: boolean = false;

    // Check if there is a group associated with the event data
    if (existingEvent.organizationId) {
      // check if the user has permission to update the event
      hasPermission = await checkUserPermission(
        loggedInUserId!,
        existingEvent.organizationId,
        AppPermissionName.MANAGE_EVENTS,
      );
    }

    if (!hasPermission && !isCreatedByUser) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to update event`,
        403,
        true,
      );
    }

    if (req.file) {
      // update the file
      if (existingEvent?.image) {
        await deleteFromS3(existingEvent.image);
      }
      const uniqueFileName = generateUniqueFileName(
        req.file!.originalname,
        eventId,
      );
      const path = `images/events/${uniqueFileName}`;
      await UploadToS3(req.file!, path);
      validatedUpdateEventData.image = path;
    }

    if (validatedUpdateEventData.locationPlaceId) {
      const existingLocation = await prisma.location.findUnique({
        where: {
          placeId: validatedUpdateEventData.locationPlaceId,
        },
      });

      if (!existingLocation) {
        const { lat, lng } = await getCoordinatesFromPlaceId(
          validatedUpdateEventData.locationPlaceId,
        );
        const name = await getPlaceNameFromPlaceId(
          validatedUpdateEventData.locationPlaceId,
        );
        const location = await prisma.location.create({
          data: {
            latitude: lat,
            longitude: lng,
            placeId: validatedUpdateEventData.locationPlaceId,
            name: name,
          },
        });
      }
    }

    // Update the event
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        ...validatedUpdateEventData,
      },
    });
    // send back the updated event
    if (updatedEvent) {
      // Event updated successfully
      res.status(200).json({
        message: "Event updated successfully",
        data: updatedEvent,
      });
    } else {
      throw new AppError(
        AppErrorName.EMPTY_RESULT_ERROR,
        "Event update returned empty result.",
        500,
        true,
      );
    }
  } catch (error: any) {
    next(error);
  }
};

// Get all Events
export const getAllEvents = async (req: RequestExtended, res: Response) => {
  try {
    // TODO use the algorithm
    // GET all events including the location
    const allEvents = await prisma.event.findMany({
      include: {
        location: true,
        organization: true,
      },
      where: {
        isPublic: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });
    res.status(200).json({
      message: "All events",
      data: allEvents,
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllMapEvents = async (req: RequestExtended, res: Response) => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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

    const userInstitution = await prisma.institution.findUnique({
      where: {
        id: user.institutionId,
      },
      include: {
        location: true,
      },
    });

    if (!userInstitution) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Institution not found",
        404,
        true,
      );
    }

    // Trending events [0-3 are featured at the top, 4-9 are trending]
    const events = await prisma.event.findMany({
      where: {
        startTime: {
          gt: new Date(),
        },
        isPublic: true,
      },
      include: {
        location: true,
      },
    });

    // check to get the events that are in 50km radius of the user's location
    events.filter((event) => {
      const distance = getDistanceFromLatLonInKm(
        userInstitution.location.latitude,
        userInstitution.location.longitude,
        event.location.latitude,
        event.location.longitude,
      );
      return distance <= defaultDistance;
    });

    const marketPlaceItems = await prisma.item.findMany({
      where: {
        state: State.Available,
        isPublic: true,
      },
      include: {
        location: true,
      },
    });

    marketPlaceItems.filter((item) => {
      const distance = getDistanceFromLatLonInKm(
        userInstitution.location.latitude,
        userInstitution.location.longitude,
        item.location.latitude,
        item.location.longitude,
      );
      return distance <= defaultDistance;
    });

    res.status(200).json({
      message: "All events",
      data: {
        events: [
          ...events.map((event) => {
            return {
              id: event.id,
              latitude: event.location.latitude,
              longitude: event.location.longitude,
              title: event.title,
              description: event.description,
            };
          }),
        ],
        items: [
          ...marketPlaceItems.map((item) => {
            return {
              id: item.id,
              latitude: item.location.latitude,
              longitude: item.location.longitude,
              title: item.title,
              description: item.description,
            };
          }),
        ],
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all verified events
export const getAllVerifiedEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allEvents = await prisma.event.findMany({
      where: {
        status: EventStatus.Verified,
        isPublic: true,
      },
    });
    res.status(200).json({
      message: "All verified events",
      data: allEvents,
    });
  } catch (error) {
    next(error);
  }
};

// Get Event by Id
export const getEventById = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const eventId = IdParamSchema.parse(req.params).id;

    // Get event from db
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        location: true,
        eventResponses: true,
        organization: true,
        user: true,
      },
    });

    if (!event) {
      // Throw error if event not found
      const notFoundError = new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Event with id ${eventId} not found`,
        404,
        true,
      );

      throw notFoundError;
    }

    const self: boolean = req.userId === event.userId;

    if (!self && !event.isPublic) {
      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to view event with id ${eventId}`,
        403,
        true,
      );
    }

    const isLiked = event.eventResponses.some(
      (response) =>
        response.userId === req.userId &&
        response.participationStatus === "Interested",
    );

    const isAttending = event.eventResponses.some(
      (response) =>
        response.userId === req.userId &&
        response.participationStatus === "Going",
    );

    res.status(200).json({
      message: "Event found",
      data: {
        id: event.id,
        title: event.title,
        description: event.description,
        location: {
          latitude: event.location.latitude,
          longitude: event.location.longitude,
          name: event.location.name,
        },
        organization: {
          organizationName: event.organization?.organizationName,
          organizationId: event.organization?.id,
          organizationImage: event.organization?.image,
        },
        startTime: event.startTime,
        image: event.image,
        attendees: event.eventResponses.filter(
          (response) => response.participationStatus === "Going",
        ).length,
        isLiked: isLiked,
        isAttending: isAttending,
        isFlagged: event.isFlagged,
        isPublic: event.isPublic,
        self: self,
        userName: event.user.firstName + " " + event.user.lastName,
        userId: event.user.id,
        userImage: event.user.profilePic,
        eventType: event.status,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get Events by User Id. Sends three json objects
export const getEventByUserId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const userId = IdParamSchema.parse(req.params).id;

    // Get event from db
    const eventsCreatedByUser = await prisma.event.findMany({
      where: {
        userId: userId,
      },
    });
    const eventsInterested = await prisma.event.findMany({
      where: {
        eventResponses: {
          some: {
            userId,
            participationStatus: "Interested",
          },
        },
      },
    });
    let userEventsData = {
      eventsCreatedByUser: eventsCreatedByUser,
      eventsInterested: eventsInterested,
    };
    res.status(200).json({
      message: "Events found",
      data: userEventsData,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves the most recent events using cursor pagination based on timestamp.
 *
 * @param req - The Express request object containing query parameters.
 * @param res - The Express response object for sending the result.
 * @param next - The Express next function for error handling.
 *
 * @returns {Promise<void>} A JSON response containing recent events and the cursor for the next page.
 * @example
 * First query, no cursor: `api/events/recent/?pageSize=10`
 * Subsequent pages: `api/events/recent/?pageSize=10&cursor=2023-12-31T05:49:02.388Z`
 */
export const getRecentEvents = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Validate the cursor options from request query parameters
    const validatedPaginationParams: CursorPaginationDatetimeParams =
      CursorPaginationDatetimeSchema.parse(req.query);

    let recentEvents;
    if (!validatedPaginationParams.cursor) {
      // First query, there is no pagination cursor to pass in
      recentEvents = await prisma.event.findMany({
        take: validatedPaginationParams.pageSize,
        orderBy: [{ createdAt: "desc" }, { id: "desc" }], // createdAt 'desc' to sort from newest to oldest
      });
    } else {
      recentEvents = await prisma.event.findMany({
        take: validatedPaginationParams.pageSize,
        skip: 1, // skip the cursor
        cursor: { createdAt: validatedPaginationParams.cursor },
        orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      });
    }

    // Extract the cursor for the next page
    const nextCursor =
      recentEvents.length > 0
        ? recentEvents[recentEvents.length - 1].createdAt
        : null;

    res.status(200).json({
      message: "Recent events",
      data: recentEvents,
      cursor: nextCursor,
    });
  } catch (error: any) {
    next(error);
  }
};

// Get all events by organization
export const getAllEventsByOrganization = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;

    // Get events from db
    const allOrgEvents = await prisma.event.findMany({
      where: {
        organizationId: organizationId,
      },
    });

    res.status(200).json({
      message: "All events for organization",
      data: allOrgEvents,
    });
  } catch (error) {
    next(error);
  }
};

// Delete event
export const deleteEvent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    // Validate request id param
    const eventId = IdParamSchema.parse(req.params).id;

    // get the event from the database
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Event not found",
        404,
        true,
      );
    }

    // Check if the user is the event's creator
    const isCreatedByUser: boolean = existingEvent.userId === loggedInUserId;

    // Check if there is a group associated with the event data
    if (existingEvent.organizationId) {
      // check if the user has permission to delete the event
      const hasPermission = await checkUserPermission(
        loggedInUserId!,
        existingEvent.organizationId,
        AppPermissionName.MANAGE_EVENTS,
      );

      // Check if the user has permission to manage events or if they are the event creator
      if (hasPermission || isCreatedByUser) {
        // Delete the event
        await prisma.event.delete({
          where: { id: eventId },
        });
      } else {
        console.error(
          `User with userId: ${loggedInUserId} does not have permission to delete the event with eventId: ${eventId}`,
        );

        throw new AppError(
          AppErrorName.PERMISSION_ERROR,
          `User does not have permission to delete event`,
          403,
          true,
        );
      }
      // Event not associated with an organization, check if user is the one who created the event
    } else if (isCreatedByUser) {
      // Delete the event
      await prisma.event.delete({
        where: { id: eventId },
      });
    } else {
      console.error(
        `User with userId: ${loggedInUserId} does not have permission to delete the event with eventId: ${eventId}`,
      );

      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to delete event`,
        403,
        true,
      );
    }
    res.status(204).end();
  } catch (error: any) {
    next(error);
  }
};

export const getMainPageEvents = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
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

    const userInstitution = await prisma.institution.findUnique({
      where: {
        id: user.institutionId,
      },
      include: {
        location: true,
      },
    });

    if (!userInstitution) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Institution not found",
        404,
        true,
      );
    }

    // Trending events [0-3 are featured at the top, 4-9 are trending]
    const events = await prisma.event.findMany({
      where: {
        AND: [
          {
            status: EventStatus.Verified,
            isPublic: true,
          },
          {
            startTime: {
              gt: new Date(),
            },
          },
        ],
      },
      include: {
        location: true,
        eventResponses: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    // check to get the events that are in 50km radius of the user's location
    events
      .filter((event) => {
        const distance = getDistanceFromLatLonInKm(
          userInstitution.location.latitude,
          userInstitution.location.longitude,
          event.location.latitude,
          event.location.longitude,
        );
        return distance <= defaultDistance;
      })
      // find the events that have the largest amount of eventResponses
      .sort((a, b) => {
        return b.eventResponses.length - a.eventResponses.length;
      });

    // Get the top 3 trending events
    const topTrendingEvents = events.slice(0, 3);
    // Get the top 10 trending events
    const trendingEvents = events.slice(3, 10);
    // get all the events happening today that don't include the top 10 trending events
    const happeningToday = events.filter(
      (event) => event.startTime.getDate() === new Date().getDate(),
    );
    const happeningTodayFiltered = happeningToday.filter(
      (event) =>
        !topTrendingEvents.includes(event) && !trendingEvents.includes(event),
    );

    // Events that the user is attending
    const attendingEvents = await prisma.event.findMany({
      where: {
        AND: [
          {
            eventResponses: {
              some: {
                userId,
                participationStatus: "Going",
              },
            },
          },
          {
            status: EventStatus.Verified,
            isPublic: true,
            endTime: {
              gt: new Date(),
            },
          },
        ],
      },
      include: {
        location: true,
      },
      orderBy: {
        endTime: "asc",
      },
      take: 10,
    });

    // Explore verified organizations
    const verifiedOrganizations = await prisma.organization.findMany({
      where: {
        institutionId: userInstitution.id,
      },
    });

    const reformattedAttendingEvents = {
      title: "Attending",
      id: "1",
      items: attendingEvents.map((event) => {
        return {
          id: event.id,
          title: event.title,
          time: event.startTime,
          location: event.location.name,
          image: event.image,
          event: true,
        };
      }),
    };

    // to get the reformattedUpcoming events we have to filter the UserOrganizationRole and search for membership status as 'Member'
    const userOrganizationRoles = await prisma.userOrganizationRole.findMany({
      where: {
        userId: userId,
      },
      include: {
        role: {
          select: {
            roleName: true,
          },
        },
        organization: true,
      },
    });

    const filteredUserOrganizationRoles = userOrganizationRoles.filter(
      (role) => role.role.roleName === "Member",
    );

    // find 5 of the most recent events that are happening in the organizations that the user is a member of
    const organizationEvents = await prisma.event.findMany({
      where: {
        AND: [
          {
            organizationId: {
              in: filteredUserOrganizationRoles.map(
                (role) => role.organizationId,
              ),
            },
          },
          {
            startTime: {
              gt: new Date(),
            },
          },
        ],
      },
      include: {
        location: true,
      },
      orderBy: {
        startTime: "asc",
      },
      take: 5,
    });

    const reformattedUpcomingEvents = {
      title: "Upcoming Events From Following",
      id: "2",
      items: organizationEvents.map((event) => {
        return {
          id: event.id,
          title: event.title,
          time: event.startTime,
          location: event.location.name,
          image: event.image,
          event: true,
        };
      }),
    };

    const reformattedTrendingEvents = {
      title: "Trending Events",
      id: "3",
      items: trendingEvents.map((event) => {
        return {
          id: event.id,
          title: event.title,
          time: event.startTime,
          location: event.location.name,
          image: event.image,
          event: true,
        };
      }),
    };

    const reformattedHappeningToday = {
      title: "Happening Today",
      id: "4",
      items: happeningTodayFiltered.map((event) => {
        return {
          id: event.id,
          title: event.title,
          time: event.startTime,
          location: event.location.name,
          image: event.image,
          event: true,
        };
      }),
    };

    const reformattedExploreOrganizations = {
      title: "Explore Verified Organizations",
      id: "5",
      items: verifiedOrganizations.map((organization) => {
        return {
          id: organization.id,
          title: organization.organizationName,
          host: null,
          location: null,
          image: organization.image,
          event: false,
        };
      }),
    };

    const startingEvents = topTrendingEvents.map((event) => {
      return { image: event.image, id: event.id, title: event.title };
    });

    res.status(200).json({
      message: "Main page events",
      data: {
        allEvents: [
          reformattedAttendingEvents,
          reformattedUpcomingEvents,
          reformattedTrendingEvents,
          reformattedHappeningToday,
          reformattedExploreOrganizations,
        ].filter((list) => list.items.length > 0),
        startingEvents:
          startingEvents.filter((event) => event.image !== null) || [],
      },
    });
  } catch (error: any) {
    next(error);
  }
};

export const LikeEvent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.userId;
    const eventId = IdParamSchema.parse(req.params).id;
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        eventResponses: true,
      },
    });

    if (!event) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Event not found",
        404,
        true,
      );
    }

    const userLikedEvent = event.eventResponses.some(
      (response) =>
        response.userId === userId &&
        response.participationStatus === "Interested",
    );

    if (userLikedEvent) {
      await prisma.userEventResponse.deleteMany({
        where: {
          eventId,
          userId,
          participationStatus: ParticipationStatus.Interested,
        },
      });
    } else {
      await prisma.userEventResponse.create({
        data: {
          eventId,
          userId: userId!,
          participationStatus: ParticipationStatus.Interested,
        },
      });
    }

    res.status(204).end();
  } catch (error: any) {
    next(error);
  }
};

export const getAttendees = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const eventId = IdParamSchema.parse(req.params).id;

    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        eventResponses: {
          where: {
            participationStatus: "Going",
          },
          include: {
            user: true,
          },
        },
      },
    });

    if (!event) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Event not found",
        404,
        true,
      );
    }

    const attendees = event.eventResponses.map((response) => {
      return {
        id: response.userId,
        name: response.user.firstName + " " + response.user.lastName,
        image: response.user.profilePic,
      };
    });

    res.status(200).json({
      message: "Event attendees",
      data: attendees,
    });
  } catch (error: any) {
    next(error);
  }
};

export const attendEvent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const userId = req.userId;
    const eventId = IdParamSchema.parse(req.params).id;
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        eventResponses: true,
      },
    });

    if (!event) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Event not found",
        404,
        true,
      );
    }

    const userLikedEvent = event.eventResponses.some(
      (response) =>
        response.userId === userId && response.participationStatus === "Going",
    );

    if (userLikedEvent) {
      await prisma.userEventResponse.deleteMany({
        where: {
          eventId,
          userId,
          participationStatus: ParticipationStatus.Going,
        },
      });
    } else {
      await prisma.userEventResponse.create({
        data: {
          eventId,
          userId: userId!,
          participationStatus: ParticipationStatus.Going,
        },
      });
    }

    res.status(204).end();
  } catch (error: any) {
    next(error);
  }
};

export const flipEventVisibility = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUserId = req.userId;

    // Validate request id param
    const eventId = IdParamSchema.parse(req.params).id;

    // get the event from the database
    const existingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!existingEvent) {
      throw new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        "Event not found",
        404,
        true,
      );
    }

    // Check if the user is the event's creator
    const isCreatedByUser: boolean = existingEvent.userId === loggedInUserId;

    // Check if there is a group associated with the event data
    if (existingEvent.organizationId) {
      // check if the user has permission to delete the event
      const hasPermission = await checkUserPermission(
        loggedInUserId!,
        existingEvent.organizationId,
        AppPermissionName.MANAGE_EVENTS,
      );

      // Check if the user has permission to manage events or if they are the event creator
      if (hasPermission || isCreatedByUser) {
        // update the event
        await prisma.event.update({
          where: { id: eventId },
          data: {
            isPublic: !existingEvent.isPublic,
          },
        });
      } else {
        console.error(
          `User with userId: ${loggedInUserId} does not have permission to delete the event with eventId: ${eventId}`,
        );

        throw new AppError(
          AppErrorName.PERMISSION_ERROR,
          `User does not have permission to delete event`,
          403,
          true,
        );
      }
      // Event not associated with an organization, check if user is the one who created the event
    } else if (isCreatedByUser) {
      // update the event
      await prisma.event.update({
        where: { id: eventId },
        data: {
          isPublic: !existingEvent.isPublic,
        },
      });
    } else {
      console.error(
        `User with userId: ${loggedInUserId} does not have permission to delete the event with eventId: ${eventId}`,
      );

      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to delete event`,
        403,
        true,
      );
    }
    res.status(204).end();
  } catch (error: any) {
    next(error);
  }
};
