import { CBRequest } from "~/lib/CBRequest";
import { EventData, EventType } from "~/types/Events";
import { OrganizationProfileForm, settingsForm } from "~/types/Profile";

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

export const geOrganizationProfileEvents = async (orgId: string) => {
  try {
    return (
      await CBRequest("GET", `/api/profile/orgEvents/:id`, {
        params: { id: orgId },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserInformation = async (data: settingsForm) => {
  let updatedData = { ...data };

  if (updatedData.password === "") {
    delete updatedData.password;
  }

  return await CBRequest("PATCH", "/api/user/me", {
    body: updatedData,
  });
};

export const updateOrgInformation = async (
  data: OrganizationProfileForm,
  id: string,
) => {
  return await CBRequest("PATCH", "/api/orgs/:id", {
    params: { id },
    body: data,
  });
};

export const deleteItem = async (id: string) => {
  return await CBRequest("DELETE", `/api/item/:id`, {
    params: { id },
  });
};
