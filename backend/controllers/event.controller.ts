import { IdParamSchema } from "@shared/zodSchemas";
import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client"; // import the singleton prisma instance
import { AppError, AppErrorName } from "../utils/AppError";

// test Event
export const eventTest = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Event endpoint works" });
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
