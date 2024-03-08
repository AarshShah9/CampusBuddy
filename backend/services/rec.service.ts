import cosineSimilarity from "../utils/cosineSimilarity";
import prisma from "../prisma/client";
import { Response, NextFunction } from "express";
import { RequestExtended } from "../middleware/verifyAuth";

const recommendEvents = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const loggedInUserId = req.userId;
  const userTags = await prisma.user.findUnique({
    where: {
      id: loggedInUserId,
    },
    include: {
      // change after discussion with JC
      // tags: true,
    },
  });

  const allEvents = await prisma.event.findMany({
    select: {
      // ask JC about this
    },
  });

  const recommendations = allEvents.map((event) => ({
    event,
    similarity: cosineSimilarity(user.tags, event.tags),
  }));

  recommendations.sort((a, b) => b.similarity - a.similarity);

  // placeholder code
  return recommendations.map((recommendation) => recommendation.event);
};

const recommendPosts = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const loggedInUserId = req.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: loggedInUserId,
    },
    include: {
      // change after discussion with JC
      // tags: true,
    },
  });

  const allPosts = await prisma.post.findMany({
    select: {
      // ask JC about this
    },
  });

  const recommendations = allPosts.map((post) => ({
    post,
    similarity: cosineSimilarity(user.tags, post.tags),
  }));

  recommendations.sort((a, b) => b.similarity - a.similarity);

  // placeholder code
  return recommendations.map((recommendation) => recommendation.post);
};

const recommendUsers = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  const loggedInUserId = req.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: loggedInUserId,
    },
    include: {
      // change after discussion with JC
      // tags: true,
    },
  });

  const allUsers = await prisma.user.findMany({
    select: {
      // ask JC about this
    },
  });

  const recommendations = allUsers.map((user) => ({
    user,
    similarity: cosineSimilarity(user.tags, user.tags),
  }));

  recommendations.sort((a, b) => b.similarity - a.similarity);

  // placeholder code
  return recommendations.map((recommendation) => recommendation.user);
};
