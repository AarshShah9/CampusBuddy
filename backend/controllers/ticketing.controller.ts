import { NextFunction, Request, Response } from "express";
import { RequestExtended } from "../middleware/verifyAuth";
import prisma from "../prisma/client";

// will create a ticket record and add to user's tickets as well as event's tickets
export const purchaseTicket = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const { eventId, userId } = req.body;

  const price = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    select: {
      price: true,
    },
  });

  try {
    if (price !== null) {
      const ticket = await prisma.ticket.create({
        data: {
          eventId: eventId,
          userId: userId,
          price: price.price || 0,
          used: false,
        },
      });

      res.status(201).json(ticket.id);
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
