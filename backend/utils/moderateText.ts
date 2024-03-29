import OpenAI from "openai";
import { env } from "./validateEnv";
import Filter from "bad-words";
import { string } from "zod";

const openai = new OpenAI({
  apiKey: env.GPT_KEY,
  organization: env.GPT_ORG,
});

export const moderateText = async (
  title: string,
  description: string | null,
) => {
  // add customBadWords here as necessary
  const customBadWords: string[] = ["fuck", "fucking", "fucker"];

  // custom filter using bad-words cuz we need to moderate fuck and all deritavitves smh
  const filter = new Filter();
  filter.addWords(...customBadWords);

  // because JS/TS scoping is weird
  let descriptionFlagged;
  let isProfaneDescription;

  const responseTitle = await openai.moderations.create({ input: title });
  const titleFlagged = responseTitle.results[0].flagged;

  const isProfaneTitle = filter.isProfane(title);

  if (description !== null) {
    const responseDescription = await openai.moderations.create({
      input: description,
    });
    descriptionFlagged = responseDescription.results[0].flagged;

    isProfaneDescription = filter.isProfane(description);
  }

  return (
    titleFlagged || descriptionFlagged || isProfaneTitle || isProfaneDescription
  );
};
