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
      await CBRequest("GET", `/api/post/:id/comments`, {
        params: { id },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = async (id: string) => {
  return await CBRequest("DELETE", `/api/post/:id`, {
    params: { id },
  });
};

export const attendPost = async (id: string) => {
  return await CBRequest("POST", `/api/post/:id/toggleAttendance`, {
    params: { id },
  });
};
