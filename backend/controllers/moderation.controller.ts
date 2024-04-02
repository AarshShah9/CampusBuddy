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
    res
      .status(500)
      .json({ error: "Internal Server Error - failed to get flagged items" });
  }
};

export const approveFlaggedItem = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.body.itemId;

    const item = await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        isPublic: true,
        isFlagged: false,
      },
    });

    res.status(200).json({
      message: "Item approved",
      data: item,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error - failed to approve flagged item",
    });
  }
};

export const rejectFlaggedItem = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { itemId } = req.body.itemId;

    const item = await prisma.item.delete({
      where: {
        id: itemId,
      },
    });

    res.status(200).json({
      message: "Item rejected",
      data: item,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error - failed to reject flagged item" });
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
    res
      .status(500)
      .json({ error: "Internal Server Error - failed to get flagged posts" });
  }
};

export const approveFlaggedPost = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = req.body.postId;

    const post = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        isPublic: true,
        isFlagged: false,
      },
    });

    res.status(200).json({
      message: "Post approved",
      data: post,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error - failed to approve post" });
  }
};

export const rejectFlaggedPost = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { postId } = req.body.itemId;

    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });

    res.status(200).json({
      message: "Post rejected and deleted",
      data: post,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error - failed to reject flagged post" });
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
    res
      .status(500)
      .json({ error: "Internal Server Error - failed to get flagged events" });
  }
};

export const approveFlaggedEvent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { eventId } = req.body.eventId;

    const event = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        isPublic: true,
        isFlagged: false,
      },
    });

    res.status(200).json({
      message: "Event approved",
      data: event,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error - failed to approve event" });
  }
};

export const rejectFlaggedEvent = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { eventId } = req.body.eventId;

    const event = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });

    res.status(200).json({
      message: "Event rejected and deleted",
      data: event,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Internal Server Error - failed to reject flagged event",
      });
  }
};
