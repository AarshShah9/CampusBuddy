import { CBRequest } from "~/lib/CBRequest";

export const getLookingForById = async (id: string) => {
  try {
    return (
      await CBRequest("GET", `/api/post/:id`, {
        params: { id },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};

export const getLookingForCommentsById = async (id: string) => {
  try {
    return (
      await CBRequest("GET", `/api/post/comments/:id`, {
        params: { id },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};
