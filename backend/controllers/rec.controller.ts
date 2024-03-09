import { Response, NextFunction } from "express";
import { RequestExtended } from "../middleware/verifyAuth";
import prisma from "../prisma/client";
import cosineSimilarity from "../utils/cosineSimilarity";
import normalizeTags from "../utils/normalizeTags";

export const recommendEvents = async (
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
  const userTags = user?.tags;

  const allTags = await prisma.tag.findMany({});

  if (userTags) {
    const userTagsNormalized = normalizeTags(userTags, allTags);

    const allEvents = await prisma.event.findMany({
      include: {
        tags: true,
      },
    });

    const eventTagMap = new Map();

    allEvents.forEach((event) => {
      const eventTagsNormalized = normalizeTags(event.tags, allTags);
      eventTagMap.set(event.id, eventTagsNormalized);
    });

    const recommendationMap = new Map();

    for (let [key, value] of eventTagMap) {
      let similarity = cosineSimilarity(userTagsNormalized, value);
      recommendationMap.set(key, similarity);
    }

    const similarityArray = Array.from(recommendationMap.entries());
    similarityArray.sort((a, b) => b[1] - a[1]);

    res.status(200).json({ similarityArray });
  }
};

export const recommendPosts = async (
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
  const userTags = user?.tags;

  const allTags = await prisma.tag.findMany({});

  if (userTags) {
    const userTagsNormalized = normalizeTags(userTags, allTags);

    const allPosts = await prisma.post.findMany({
      include: {
        tags: true,
      },
    });

    const postTagMap = new Map();

    allPosts.forEach((post) => {
      const eventTagsNormalized = normalizeTags(post.tags, allTags);
      postTagMap.set(post.id, eventTagsNormalized);
    });

    const recommendationMap = new Map();

    for (let [key, value] of postTagMap) {
      let similarity = cosineSimilarity(userTagsNormalized, value);
      recommendationMap.set(key, similarity);
    }

    const similarityArray = Array.from(recommendationMap.entries());
    similarityArray.sort((a, b) => b[1] - a[1]);

    res.status(200).json({ similarityArray });
  }
};

export const recommendUsers = async (
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
  const userTags = user?.tags;

  const allTags = await prisma.tag.findMany({});

  if (userTags) {
    const userTagsNormalized = normalizeTags(userTags, allTags);

    const allUsers = await prisma.user.findMany({
      include: {
        tags: true,
      },
    });

    const userTagMap = new Map();

    allUsers.forEach((user) => {
      const eventTagsNormalized = normalizeTags(user.tags, allTags);
      userTagMap.set(user.id, eventTagsNormalized);
    });

    const recommendationMap = new Map();

    for (let [key, value] of userTagMap) {
      let similarity = cosineSimilarity(userTagsNormalized, value);
      recommendationMap.set(key, similarity);
    }

    const similarityArray = Array.from(recommendationMap.entries());
    similarityArray.sort((a, b) => b[1] - a[1]);

    res.status(200).json({ similarityArray });
  }
};
