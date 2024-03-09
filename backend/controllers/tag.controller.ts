import { RequestExtended } from "../middleware/verifyAuth";
import { Response, NextFunction } from "express";
import prisma from "../prisma/client";

export const readUserTags = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  // modify during integration
  const loggedInUserId = req.body.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: loggedInUserId,
    },
    include: {
      tags: true,
    },
  });

  res.status(200).json({ tags: user?.tags });
};

export const modifyUserTags = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  // modify during integration
  const loggedInUserId = req.body.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: loggedInUserId,
    },
    include: {
      tags: true,
    },
  });

  console.log(user);

  for (const tag of req.body.tags) {
    const foundTag = await prisma.tag.findUnique({
      where: {
        name: tag,
      },
    });

    if (foundTag) {
      await prisma.user.update({
        where: {
          id: loggedInUserId,
        },
        data: {
          tags: {
            connect: {
              id: foundTag.id,
            },
          },
        },
      });
    }
  }

  res.status(200).json({ message: "Tags updated successfully" });
};

export const readEventTags = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  // modify during integration
  const relevantEventId = req.body.eventId;
  const event = await prisma.event.findUnique({
    where: {
      id: relevantEventId,
    },
    include: {
      tags: true,
    },
  });

  res.status(200).json({ tags: event?.tags });
};

export const modifyEventTags = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const relevantEventId = req.body.eventId;
  const event = await prisma.event.findUnique({
    where: {
      id: relevantEventId,
    },
    include: {
      tags: true,
    },
  });

  console.log(relevantEventId);

  for (const tag of req.body.tags) {
    const foundTag = await prisma.tag.findUnique({
      where: {
        name: tag,
      },
    });

    if (foundTag) {
      await prisma.user.update({
        where: {
          id: relevantEventId,
        },
        data: {
          tags: {
            connect: {
              id: foundTag.id,
            },
          },
        },
      });
    }
  }

  res.status(200).json({ message: "Tags updated successfully" });
};

export const readPostTags = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  // modify during integration
  const relevantPostId = req.body.postId;
  const post = await prisma.post.findUnique({
    where: {
      id: relevantPostId,
    },
    include: {
      tags: true,
    },
  });

  res.status(200).json({ tags: post?.tags });
};

export const modifyPostTags = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const relevantPostId = req.body.postId;
  const post = await prisma.event.findUnique({
    where: {
      id: relevantPostId,
    },
    include: {
      tags: true,
    },
  });

  console.log(relevantPostId);

  for (const tag of req.body.tags) {
    const foundTag = await prisma.tag.findUnique({
      where: {
        name: tag,
      },
    });

    if (foundTag) {
      await prisma.user.update({
        where: {
          id: relevantPostId,
        },
        data: {
          tags: {
            connect: {
              id: foundTag.id,
            },
          },
        },
      });
    }
  }

  res.status(200).json({ message: "Tags updated successfully" });
};
