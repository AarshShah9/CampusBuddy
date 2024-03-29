import OpenAI from "openai";
import { env } from "./validateEnv";

const openai = new OpenAI({
  apiKey: env.GPT_KEY,
  organization: env.GPT_ORG,
});

export const moderateText = async (
  title: string,
  description: string | null,
) => {
  // because JS/TS scoping is weird
  let descriptionFlagged;

  const responseTitle = await openai.moderations.create({ input: title });
  const titleFlagged = responseTitle.results[0].flagged;

  if (description !== null) {
    const responseDescription = await openai.moderations.create({
      input: description,
    });
    descriptionFlagged = responseDescription.results[0].flagged;
  }

  return titleFlagged || descriptionFlagged;
};
