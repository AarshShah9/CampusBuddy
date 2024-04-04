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

export const getUserProfilePosts = async (userId: string) => {
  try {
    return (
      await CBRequest("GET", `/api/profile/posts/:id`, {
        params: { id: userId },
      })
    ).data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getUserProfileItems = async (userId: string) => {
  try {
    return (
      await CBRequest("GET", `/api/profile/items/:id`, {
        params: { id: userId },
      })
    ).data;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export const getOrgProfile = async (orgId: string) => {
  try {
    return (
      await CBRequest("GET", `/api/profile/orgItems/:id`, {
        params: { id: orgId },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};

export const joinOrg = async (orgId: string) => {
  try {
    return await CBRequest("POST", `/api/orgs/join/:id`, {
      params: { id: orgId },
    });
  } catch (err) {
    console.log(err);
  }
};
