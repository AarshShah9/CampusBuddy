import { AppPermissionName, EventStatus } from "@prisma/client";
import {
  CursorPaginationDatetimeParams,
  CursorPaginationDatetimeSchema,
  EventCreateSchema,
  EventUpdateSchema,
  IdParamSchema,
} from "../../shared/zodSchemas";
import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client"; // import the singleton prisma instance
import { AppError, AppErrorName } from "../utils/AppError";
import { checkUserPermission } from "../utils/checkUserPermission";
import UploadToS3, {
  deleteFromS3,
  generateUniqueFileName,
} from "../utils/S3Uploader";

const userId = "3"; // Placeholder for testing

// test Event
export const eventTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Event endpoint works" });
};

// Create new Event
// Takes multipart form data.
// The user is required to have CREATE_EVENTS permission for the organization
export const createVerifiedEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const organizationId = IdParamSchema.parse(req.params).id;

    // Validate the Event data with zod schema
    // Note we are expecting form data on anything that includes a file upload, thus we must parse the data
    const validatedEventData = EventCreateSchema.parse(req.body);

    // Check if the user has permission to create an event
    const hasPermission = await checkUserPermission(
      userId, // Assuming you've got the userId from somewhere, like req.user.id
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
      // Create a verified event for an organization
      const event = await prisma.event.create({
        data: {
          ...validatedEventData,
          organizationId,
          userId,
          status: EventStatus.Verified,
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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Get userId
    // const userId = req.user.id; // get userId from the request -> set in auth middleware

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
      const event = await prisma.event.create({
        data: {
          ...validatedEventData,
          userId,
          status: EventStatus.NonVerified,
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
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const eventId = IdParamSchema.parse(req.params).id;
    // const userId = req.userId; // get userId from the request

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
    const isCreatedByUser: boolean = existingEvent.userId === userId;
    let hasPermission: boolean = false;

    // Check if there is a group associated with the event data
    if (existingEvent.organizationId) {
      // check if the user has permission to update the event
      hasPermission = await checkUserPermission(
        userId,
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
export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const allEvents = await prisma.event.findMany();
    res.status(200).json(allEvents);
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
      },
    });
    res.status(200).json(allEvents);
  } catch (error) {
    next(error);
  }
};

// Get Event by Id
export const getEventById = async (
  req: Request,
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

    res.status(200).json(event);
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
        id: userId,
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

    const eventsGoing = await prisma.event.findMany({
      where: {
        eventResponses: {
          some: {
            userId,
            participationStatus: "Going",
          },
        },
      },
    });
    if (!eventsInterested) {
      // Throw error if event not found
      const notFoundError = new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Event created by id ${userId} not found`,
        404,
        true,
      );
      throw notFoundError;
    }
    if (!eventsCreatedByUser) {
      // Throw error if event not found
      const notFoundError = new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Event created by id ${userId} not found`,
        404,
        true,
      );
      throw notFoundError;
    }
    if (!eventsGoing) {
      // Throw error if event not found
      const notFoundError = new AppError(
        AppErrorName.NOT_FOUND_ERROR,
        `Event created by id ${userId} not found`,
        404,
        true,
      );
      throw notFoundError;
    }
    res.status(200).json(eventsCreatedByUser);
    res.status(200).json(eventsInterested);
    res.status(200).json(eventsGoing);
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

    res.status(200).json(allOrgEvents);
  } catch (error) {
    next(error);
  }
};

// Delete event
export const deleteEvent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Validate request id param
    const eventId = IdParamSchema.parse(req.params).id;
    // const userId = req.user.id;

    // TODO: clean up and pull the code below into event.service
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
    const isCreatedByUser: boolean = existingEvent.userId === userId;

    // Check if there is a group associated with the event data
    if (existingEvent.organizationId) {
      // check if the user has permission to delete the event
      const hasPermission = await checkUserPermission(
        userId,
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
          `User with userId: ${userId} does not have permission to delete the event with eventId: ${eventId}`,
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
        `User with userId: ${userId} does not have permission to delete the event with eventId: ${eventId}`,
      );

      throw new AppError(
        AppErrorName.PERMISSION_ERROR,
        `User does not have permission to delete event`,
        403,
        true,
      );
    }
    res.status(204).end(); // No content after sucessful deletion
  } catch (error: any) {
    next(error);
  }
};
