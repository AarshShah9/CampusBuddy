import { CBRequest } from "~/lib/CBRequest";
import { EventData, EventType } from "~/types/Events";

export const getProfileSaved = async () => {
  try {
    return (await CBRequest("GET", "/api/profile/saved")).data as EventData[];
  } catch (err) {
    console.log(err);
  }
};

export const getUserProfile = async (userId: string) => {
  try {
    return (
      await CBRequest("GET", `/api/profile/user/:id`, {
        params: { id: userId },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserProfileEvents = async (
  userId: string,
): Promise<EventData[]> => {
  try {
    return (
      await CBRequest("GET", `/api/profile/events/:id`, {
        params: { id: userId },
      })
    ).data;
  } catch (err) {
    console.log(err);
    return [];
  }
};