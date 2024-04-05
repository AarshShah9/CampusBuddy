import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import { RequestExtended } from "../middleware/verifyAuth";
import {
  ModerationSchemaEvent,
  ModerationSchemaItem,
  ModerationSchemaPost,
  ModerationSchemaRejection,
} from "../../shared/zodSchemas";
import {
  emailItemApproved,
  emailItemRejected,
  emailPostApproved,
  emailPostRejected,
  emailEventApproved,
  emailEventRejected,
} from "../utils/emails";
import { AppError, AppErrorName } from "../utils/AppError";

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
    const itemId = ModerationSchemaItem.parse(req.body).itemId;

    const approvedItem = await prisma.$transaction(async (prisma) => {
      // get item
      const item = await prisma.item.findUnique({
        where: {
          id: itemId,
        },
        include: {
          user: true,
        },
      });

      if (!item) {
        throw new AppError(
          AppErrorName.NOT_FOUND_ERROR,
          "Item not found",
          404,
          true,
        );
      }

      // approve item
      const approvedItem = await prisma.item.update({
        where: {
          id: itemId,
        },
        data: {
          isPublic: true,
          isFlagged: false,
          createdAt: new Date(),
        },
      });

      // Send email to user if item is approved
      await emailItemApproved(item.user, item!);

      return approvedItem;
    });

    res.status(200).json({
      message: "Item approved",
      data: approvedItem,
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
    const itemId = ModerationSchemaItem.parse(req.body).itemId;
    const rejectionReason = ModerationSchemaRejection.parse(
      req.body,
    ).rejectionReason;

    const rejectedItem = await prisma.$transaction(async (prisma) => {
      // get item
      const item = await prisma.item.findUnique({
        where: {
          id: itemId,
        },
        include: {
          user: true,
        },
      });

      if (!item) {
        throw new AppError(
          AppErrorName.NOT_FOUND_ERROR,
          "Item not found",
          404,
          true,
        );
      }

      // delete item
      const rejectedItem = await prisma.item.delete({
        where: {
          id: itemId,
        },
      });

      // Send email to user if item is rejected
      await emailItemRejected(item.user, item!, rejectionReason);

      return rejectedItem;
    });

    res.status(200).json({
      message: "Item rejected",
      data: rejectedItem,
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
    const postId = ModerationSchemaPost.parse(req.body).postId;

    const approvedPost = await prisma.$transaction(async (prisma) => {
      // get post
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
        },
      });

      if (!post) {
        throw new AppError(
          AppErrorName.NOT_FOUND_ERROR,
          "Post not found",
          404,
          true,
        );
      }

      // approve post
      const approvedPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          isPublic: true,
          isFlagged: false,
          createdAt: new Date(),
        },
      });

      // Send email to user if post is approved
      await emailPostApproved(post.user, post);
    });

    res.status(200).json({
      message: "Post approved",
      data: approvedPost,
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
    const postId = ModerationSchemaPost.parse(req.body).postId;
    const rejectionReason = ModerationSchemaRejection.parse(
      req.body,
    ).rejectionReason;

    const rejectedPost = await prisma.$transaction(async (prisma) => {
      // get post
      const post = await prisma.post.findUnique({
        where: {
          id: postId,
        },
        include: {
          user: true,
        },
      });

      if (!post) {
        throw new AppError(
          AppErrorName.NOT_FOUND_ERROR,
          "Post not found",
          404,
          true,
        );
      }

      // delete post
      const rejectedPost = await prisma.post.delete({
        where: {
          id: postId,
        },
      });

      // Send email to user if post is rejected
      await emailPostRejected(post.user, post!, rejectionReason);

      return rejectedPost;
    });

    res.status(200).json({
      message: "Post rejected and deleted",
      data: rejectedPost,
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
    const eventId = ModerationSchemaEvent.parse(req.body).eventId;

    const approvedEvent = await prisma.$transaction(async (prisma) => {
      // get event
      const event = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
        include: {
          user: true,
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

      // approve event
      const approvedEvent = await prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          isPublic: true,
          isFlagged: false,
          createdAt: new Date(),
        },
      });

      // Send email to user if event is approved
      await emailEventApproved(event.user, event);

      return approvedEvent;
    });

    res.status(200).json({
      message: "Event approved",
      data: approvedEvent,
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
    const eventId = ModerationSchemaEvent.parse(req.body).eventId;
    const rejectionReason = ModerationSchemaRejection.parse(
      req.body,
    ).rejectionReason;

    const rejectedEvent = await prisma.$transaction(async (prisma) => {
      // get event
      const event = await prisma.event.findUnique({
        where: {
          id: eventId,
        },
        include: {
          user: true,
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

      // delete event
      const rejectedEvent = await prisma.event.delete({
        where: {
          id: eventId,
        },
      });

      // Send email to user if event is rejected
      await emailEventRejected(event.user, event, rejectionReason);

      return rejectedEvent;
    });

    res.status(200).json({
      message: "Event rejected and deleted",
      data: rejectedEvent,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error - failed to reject flagged event",
    });
  }
};
