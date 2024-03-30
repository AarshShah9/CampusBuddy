import OpenAI from "openai";
import { env } from "./validateEnv";
import Filter from "bad-words";

const openai = new OpenAI({
  apiKey: env.GPT_KEY,
  organization: env.GPT_ORG,
});

export const moderateText = async (
  title: string,
  description: string | null,
) => {
  try {
    // add customBadWords here as necessary
    const customBadWords: string[] = [
      "fuck",
      "fucking",
      "fucker",
      "shit",
      "bitch",
      "cunt",
    ];

    const filter = new Filter();
    filter.addWords(...customBadWords);

    let descriptionFlagged;
    let isProfaneDescription;

    const responseTitle = await openai.moderations.create({ input: title });
    const titleFlagged = responseTitle.results[0].flagged;

    const isProfaneTitle = filter.isProfane(title);

    console.log("title", title, isProfaneTitle);

    if (description !== null) {
      const responseDescription = await openai.moderations.create({
        input: description,
      });
      descriptionFlagged = responseDescription.results[0].flagged;

      isProfaneDescription = filter.isProfane(description);
    }

    return (
      titleFlagged ||
      descriptionFlagged ||
      isProfaneTitle ||
      isProfaneDescription
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};
