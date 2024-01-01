import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import prisma from '../prisma/client'; // import the singleton prisma instance
import {
    CursorPaginationDatetimeParams,
    CursorPaginationDatetimeSchema,
    CursorPaginationParams,
    CursorPaginationSchema,
    EventCreateSchema,
    EventUpdateSchema,
    FileCreateSchema,
    IdParamSchema,
} from '@shared/schemas';
import { checkUserPermission } from '../utils/checkUserPermission';
import { AppPermissionName, Event, EventStatus, File } from '@prisma/client';
import { createFile } from '../services/file.service';
import { AppError, AppErrorName } from '../utils/AppError';

// test Event
export const eventTest = async (req: Request, res: Response) => {
    res.status(200).json({ message: 'Event endpoint works' });
};

// Create new Event
export const createNewVerifiedEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Takes multipart form data
    try {
        // Get userId
        // const userId = req.user.id; // get userId from the request -> set in auth middleware
        const userId = 1; // Placeholder for testing
        // Validate request id param
        const organizationId = IdParamSchema.parse(req.params).id;

        // Validate the Event data with zod schema
        const validatedEventData = EventCreateSchema.parse(req.body);

        // Validate file data (if available)
        let validatedFileData: z.infer<typeof FileCreateSchema> | undefined;
        if (req.file) {
            validatedFileData = FileCreateSchema.parse({
                fileName: req.file.originalname,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            });
        }

        // create a file
        let newFile: File | null;
        let imageId: number | null = null;

        if (validatedFileData) {
            // Create the file
            newFile = await createFile(validatedFileData, userId);
            imageId = newFile?.id ?? null;
        }
        // create event
        let newEvent: Event;

        // check if the user has permission to create an event
        const hasPermission = await checkUserPermission(
            userId,
            organizationId,
            AppPermissionName.CREATE_EVENTS
        );
        if (hasPermission) {
            // Create a verified event for an organization
            newEvent = await prisma.event.create({
                data: {
                    ...validatedEventData,
                    organizationId,
                    userId,
                    imageId,
                    status: EventStatus.Verified,
                },
            });
        } else {
            throw new AppError(
                AppErrorName.PERMISSION_ERROR,
                `User does not have permission to create event`,
                403,
                true
            );
        }

        if (newEvent) {
            // Event created successfully
            res.status(201).json({
                message: 'Event created successfully',
                data: newEvent,
            });
        } else {
            // Throw an error if the event creation returned an empty result
            throw new AppError(
                AppErrorName.EMPTY_RESULT_ERROR,
                'Event creation returned empty result.',
                500,
                true
            );
        }
    } catch (error: any) {
        // hand error over to error handling middleware
        next(error);
    }
};

// Create new Event
export const createNewEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Get userId
        // const userId = req.user.id; // get userId from the request -> set in auth middleware
        const userId = 1; // Placeholder for testing

        // Validate the Event data
        const validatedEventData = EventCreateSchema.parse(req.body);

        // Validate file data (if available)
        let validatedFileData: z.infer<typeof FileCreateSchema> | undefined;
        if (req.file) {
            validatedFileData = FileCreateSchema.parse({
                fileName: req.file.originalname,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            });
        }

        // create a file
        let newFile: File | null;
        let imageId: number | null = null;

        if (validatedFileData) {
            // Create the file
            newFile = await createFile(validatedFileData, userId);
            imageId = newFile?.id ?? null;
        }

        // create event
        const newEvent = await prisma.event.create({
            data: {
                ...validatedEventData,
                userId,
                imageId,
                status: EventStatus.NonVerified,
            },
        });
        if (newEvent) {
            // Event created successfully
            res.status(201).json({
                message: 'Event created successfully',
                data: newEvent,
            });
        } else {
            // Throw an error if the event creation returned an empty result
            throw new AppError(
                AppErrorName.EMPTY_RESULT_ERROR,
                'Event creation returned empty result.',
                500,
                true
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
    next: NextFunction
) => {
    try {
        // Validate request id param
        const eventId = IdParamSchema.parse(req.params).id;
        // const userId = req.userId; // get userId from the request
        const userId = 3; // Placeholder for testing

        // Validate event data
        const validatedUpdateEventData = EventUpdateSchema.parse(req.body);
        // Validate file data (if available)
        let validatedFileData: z.infer<typeof FileCreateSchema> | undefined;
        if (req.file) {
            validatedFileData = FileCreateSchema.parse({
                fileName: req.file.originalname,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            });
        }
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
                true
            );
        }

        // Check if the user is permitted to update the event details
        const isCreatedByUser: boolean = existingEvent.userId === userId;
        let hasPermission: boolean = false;

        // Check if there is a group associated with the event data
        if (existingEvent.organizationId) {
            // check if the user has permission to update the event
            hasPermission = await checkUserPermission(
                userId,
                existingEvent.organizationId,
                AppPermissionName.MANAGE_EVENTS
            );
        }

        let updatedEvent: Event;
        // TODO: should fileService handle deletion of the previous file?
        if (hasPermission || isCreatedByUser) {
            // create a file
            let newFile: File | null;
            let imageId: number | null = existingEvent.imageId;
            if (validatedFileData) {
                // Create the file
                newFile = await createFile(validatedFileData, userId);
                imageId = newFile?.id ?? null;
            }
            // Update the event
            updatedEvent = await prisma.event.update({
                where: { id: eventId },
                data: {
                    ...validatedUpdateEventData,
                    imageId,
                },
            });
            // send back the updated event
            if (updatedEvent) {
                // Event created successfully
                res.status(200).json({
                    message: 'Event updated successfully',
                    data: updatedEvent,
                });
            }
        } else {
            throw new AppError(
                AppErrorName.PERMISSION_ERROR,
                `User does not have permission to update event`,
                403,
                true
            );
        }

        // update the file associated with the event
        // need to handle removing file from cloud storage
        // Think about how to put limits on this to prevent malicious user activity or heavy traffic

        //     // add the image to the event

        // }
        // if (existingEvent.imageId && validatedFileData)
        // if (validatedFileData) {
        //     const existingFile = await prisma.file.findUnique({
        //         where: { eventId: existingEvent.id },
        //     });

        //     // const fileData: FileCreateInput = {
        //     //     ...validatedFileData,
        //     //     eventId: existingEvent.id, // insert eventId into fileData
        //     // };
        //     // Update the file
        //     const updatedFile = await updateEventImage(fileData, fileId);
        // }

        // // send back the updated event
        // if (updatedEvent) {
        //     // Event created successfully
        //     res.status(200).json({
        //         message: 'Event updated successfully',
        //         data: updatedEvent,
        //     });
        // }
    } catch (error: any) {
        next(error);
    }
};

// Update Only the Event Image
export const updateEventImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Validate request id param
        const eventId = IdParamSchema.parse(req.params).id;
        // const userId = req.userId; // get userId from the request -> set in auth middleware/ jwt payload
        const userId = 1; // Placeholder for testing

        // Validate file data
        let validatedFileData: z.infer<typeof FileCreateSchema> | undefined;
        if (req.file) {
            validatedFileData = FileCreateSchema.parse({
                fileName: req.file.originalname,
                fileType: req.file.mimetype,
                fileSize: req.file.size,
            });
        }

        // Verify that the event exists in the database
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
                true
            );
        }

        // Check if the user is permitted to update the event
        const isCreatedByUser: boolean = existingEvent.userId === userId;
        let hasPermission: boolean = false;

        // Check if there is a group associated with the event data
        if (existingEvent.organizationId) {
            // check if the user has permission to update the event
            hasPermission = await checkUserPermission(
                userId,
                existingEvent.organizationId,
                AppPermissionName.MANAGE_EVENTS
            );
        }

        if (hasPermission || isCreatedByUser) {
            // create a file
            let newFile: File | null;
            // let imageId: number | null = null;
            if (validatedFileData) {
                // Create the file
                newFile = await createFile(validatedFileData, userId);
                // imageId = newFile?.id ?? null;

                // Update the imageId of the event
                await prisma.event.update({
                    where: { id: eventId },
                    data: {
                        imageId: newFile.id,
                    },
                });
                return res.status(201).json(newFile);
            }
        } else {
            // User does not have permission
            throw new AppError(
                AppErrorName.PERMISSION_ERROR,
                `User does not have permission to delete event`,
                403,
                true
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
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get all verified events
export const getAllVerifiedEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
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
    next: NextFunction
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
                true
            );

            throw notFoundError;
        }

        res.status(200).json(event);
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
 * @throws {ValidationError} If the request query parameters do not match the expected schema.
 *
 * @returns {Promise<void>} A JSON response containing recent events and the cursor for the next page.
 * @example
 * First query, no cursor: `api/events/recent/?pageSize=10`
 *
 * Subsequent pages: `api/events/recent/?pageSize=10&cursor=2023-12-31T05:49:02.388Z`
 */
export const getRecentEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
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
                orderBy: [{ createdAt: 'desc' }, { id: 'desc' }], // createdAt 'desc' to go from new to old
            });
        } else {
            recentEvents = await prisma.event.findMany({
                take: validatedPaginationParams.pageSize,
                skip: 1, // skip the cursor
                cursor: { createdAt: validatedPaginationParams.cursor },
                orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
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
    next: NextFunction
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

// verify that the user can delete it -> check their id and permissions
export const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // Validate request id param
        const eventId = IdParamSchema.parse(req.params).id;
        // const userId = req.user.id;
        const userId = 1; // Placeholder

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
                'Event not found',
                404,
                true
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
                AppPermissionName.MANAGE_EVENTS
            );

            // Check if the user has permission to manage events or if they are the event creator
            if (hasPermission || isCreatedByUser) {
                // Delete the event
                await prisma.event.delete({
                    where: { id: eventId },
                });
            } else {
                console.error(
                    `User with userId: ${userId} does not have permission to delete the event with eventId: ${eventId}`
                );

                throw new AppError(
                    AppErrorName.PERMISSION_ERROR,
                    `User does not have permission to delete event`,
                    403,
                    true
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
                `User with userId: ${userId} does not have permission to delete the event with eventId: ${eventId}`
            );

            throw new AppError(
                AppErrorName.PERMISSION_ERROR,
                `User does not have permission to delete event`,
                403,
                true
            );
        }
        res.status(204).end(); // No content after sucessful deletion
    } catch (error: any) {
        next(error);
    }
};
