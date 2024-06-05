import { RequestExtended } from "../middleware/verifyAuth";
import { Response, NextFunction } from "express";
import prisma from "../prisma/client";
import { AppError, AppErrorName } from "../utils/AppError";

export const getAllTags = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tags = await prisma.topic.findMany({
      select: {
        topicName: true,
      },
    });

    if (!tags) {
      throw new AppError(AppErrorName.NOT_FOUND_ERROR, "Tags not found", 404);
    }

    res.status(200).json({
      data: { tags: tags.map((tag) => tag.topicName) },
      message: "Tags fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (
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
      subscriptions: {
        include: {
          topic: {
            select: {
              id: true,
              topicName: true,
            },
          },
        },
      },
    },
  });

  if (!user) {
    throw new AppError(AppErrorName.NOT_FOUND_ERROR, "User not found", 404);
  }

  res.status(200).json({
    topics: user.subscriptions.map((sub) => {
      return {
        id: sub.topic.id,
        name: sub.topic.topicName,
      };
    }),
  });
};

export const modifyUserTags = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  // modify during integration
  const loggedInUserId = req.body.userId;
};
