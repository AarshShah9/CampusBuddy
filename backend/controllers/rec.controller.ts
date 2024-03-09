import { Response, NextFunction } from "express";
import { RequestExtended } from "../middleware/verifyAuth";
import prisma from "../prisma/client";
import cosineSimilarity from "../utils/cosineSimilarity";
import normalizeTags from "../utils/normalizeTags";
import { consoleLog } from "@ngrok/ngrok";

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
      console.log(key);
      console.log(value);
      console.log(userTagsNormalized);
      let similarity = cosineSimilarity(userTagsNormalized, value);
      console.log(similarity);
      recommendationMap.set(key, similarity);
    }

    const similarityArray = Array.from(recommendationMap.entries());
    similarityArray.sort((a, b) => b[1] - a[1]);

    res.status(200).json({ similarityArray });
  }
};
