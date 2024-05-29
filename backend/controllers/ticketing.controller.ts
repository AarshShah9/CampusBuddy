import { NextFunction, Request, Response } from "express";
import { RequestExtended } from "../middleware/verifyAuth";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";
import { number } from "zod";

// will create a ticket record and add to user's tickets as well as event's tickets
export const purchaseTicket = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const { eventId, userId } = req.body;

  try {
    const newTicket = await prisma.$transaction(async (prisma) => {
      // pull event from db
      const event = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      // check if event exists and is paid
      if (!event || !event.isPaid) {
        throw new AppError(
          AppErrorName.NOT_FOUND_ERROR,
          "Event not found or is not paid",
          404,
          true,
        );
      }

      // pull user from db
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      // check if user exists
      if (!user) {
        throw new AppError(
          AppErrorName.NOT_FOUND_ERROR,
          "User not found",
          404,
          true,
        );
      }

      // create ticket
      // wrap with check to ensure ticker price is valid
      if (event.price !== null) {
        const ticket = await prisma.ticket.create({
          data: {
            eventId: eventId,
            userId: userId,
            price: event.price,
            used: false,
          },
        });

        return ticket;
      }
    });

    if (newTicket) {
      res.status(201).json(newTicket.id);
    } else {
      res.status(404).json("Event not found");
    }
  } catch (error) {
    next(error);
  }
};

export const getQRCodePayload = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const { ticketId } = req.body;

  try {
    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
      },
      select: {
        id: true,
        eventId: true,
        userId: true,
        price: true,
        used: true,
      },
    });

    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json("Ticket not found");
    }
  } catch (error) {
    next(error);
  }
};

// will verify if a user has a ticket for an event
export const verifyTicket = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const { eventId, userId } = req.body;

  try {
    const ticket = await prisma.ticket.findFirst({
      where: {
        eventId: eventId,
        userId: userId,
        used: false,
      },
    });

    if (ticket) {
      await prisma.ticket.update({
        where: {
          id: ticket.id,
        },
        data: {
          used: true,
        },
      });

      res.status(200).json(ticket.id);
    } else {
      res.status(404).json("Ticket not found");
    }
  } catch (error) {
    next(error);
  }
};
