import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { RequestExtended } from "../middleware/verifyAuth";

export const getFlaggedItems = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const flaggedItems = await prisma.item.findMany({
      where: {
        isFlagged: true,
      },
    });

    res.status(200).json({
      message: "Flagged items",
      data: flaggedItems,
    });
  } catch (error) {
    console.error("Error fetching flagged items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFlaggedPosts = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const flaggedPosts = await prisma.post.findMany({
      where: {
        isFlagged: true,
      },
    });

    res.status(200).json({
      message: "Flagged posts",
      data: flaggedPosts,
    });
  } catch (error) {
    console.error("Error fetching flagged posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getFlaggedEvents = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const flaggedEvents = await prisma.event.findMany({
      where: {
        isFlagged: true,
      },
    });

    res.status(200).json({
      message: "Flagged events",
      data: flaggedEvents,
    });
  } catch (error) {
    console.error("Error fetching flagged events:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
