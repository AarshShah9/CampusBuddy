import { Response, NextFunction } from "express";
import { RequestExtended } from "../middleware/verifyAuth";
import prisma from "../prisma/client";
import tagMapping from "../utils/tagMap";
import cosineSimilarity from "../utils/cosineSimilarity";

const normalizeTags = (tags: string[]) => {
  const normalizedTags = new Array(20).fill(0);
  tags.forEach((tag) => {
    normalizedTags[tagMapping[tag]] = 1;
  });
  return normalizedTags;
};

export const recommendEvents = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction,
) => {
  // modify during integration
  const loggedInUserId = req.body.userId;
  const userTags = await prisma.user.findUnique({
    where: {
      id: loggedInUserId,
    },
    include: {
      tags: true,
    },
  });

  const allEventTags = await prisma.event.findMany({
    select: {
      tags: true,
    },
  });

  const allEventTagIds = allEventTags.map((event) =>
    event.tags.map((tag) => tag.id),
  );

  const recommendations = allEventTagIds.map((event) => ({
    event,
    similarity: cosineSimilarity([1], [1]),
  }));

  recommendations.sort((a, b) => b.similarity - a.similarity);

  // placeholder code
  return recommendations.map((recommendation) => recommendation.event);
};

// export const recommendPosts = async (
//   req: RequestExtended,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const loggedInUserId = req.userId;
//   const user = await prisma.user.findUnique({
//     where: {
//       id: loggedInUserId,
//     },
//     include: {
//       // change after discussion with JC
//       // tags: true,
//     },
//   });

//   const allPosts = await prisma.post.findMany({
//     select: {
//       // ask JC about this
//     },
//   });

//   const recommendations = allPosts.map((post) => ({
//     post,
//     similarity: cosineSimilarity(user.tags, post.tags),
//   }));

//   recommendations.sort((a, b) => b.similarity - a.similarity);

//   // placeholder code
//   return recommendations.map((recommendation) => recommendation.post);
// };

// export const recommendUsers = async (
//   req: RequestExtended,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const loggedInUserId = req.userId;
//   const user = await prisma.user.findUnique({
//     where: {
//       id: loggedInUserId,
//     },
//     include: {
//       // change after discussion with JC
//       // tags: true,
//     },
//   });

//   const allUsers = await prisma.user.findMany({
//     select: {
//       // ask JC about this
//     },
//   });

//   const recommendations = allUsers.map((user) => ({
//     user,
//     similarity: cosineSimilarity(user.tags, user.tags),
//   }));

//   recommendations.sort((a, b) => b.similarity - a.similarity);

//   // placeholder code
//   return recommendations.map((recommendation) => recommendation.user);
// };
