import { CBRequest, uploadImageRequest } from "../CBRequest";
import { ImagePickerAsset } from "expo-image-picker";
import { EventCreateType } from "~/types/schemas";
import { AttendeeResponse } from "~/types/Events";

export async function getHomePageEvents() {
  return [];
}
export async function getSearchPageEvents() {
  try {
    return (await CBRequest("GET", "/api/events/")).data;
  } catch (e) {
    console.log(e);
  }
}
export async function getProfilePageEvents() {
  return [];
}

export const getMainEvents = async () => {
  try {
    return await CBRequest("GET", "/api/events/mainPage");
  } catch (err) {
    console.log(err);
  }
};

export const createEvent = async (
  event: EventCreateType,
  image: ImagePickerAsset,
  verified: boolean = false,
  id: string,
): Promise<any> => {
  try {
    if (verified) {
      return await uploadImageRequest(
        "post",
        "/api/events/organization/:id",
        image,
        {
          body: event,
          params: {
            id,
          },
        },
      );
    } else {
      return await uploadImageRequest("post", "/api/events/", image, {
        body: event,
      });
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAllMapEvents = async () => {
  try {
    return (await CBRequest("GET", "/api/events/mapEvents")).data;
  } catch (err) {
    console.log(err);
  }
};

export const getEventDetails = async (id: string) => {
  try {
    return (
      await CBRequest("GET", "/api/events/:id", {
        params: {
          id,
        },
      })
    ).data;
  } catch (err) {
    console.log(err);
    return null;
  }
};

export const likeEvent = async (id: string) => {
  try {
    return await CBRequest("POST", "/api/events/like/:id", {
      params: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteEvent = async (id: string) => {
  try {
    return await CBRequest("DELETE", "/api/events/:id", {
      params: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const attendEvent = async (id: string) => {
  try {
    return await CBRequest("POST", "/api/events/attend/:id", {
      params: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllPosts = async () => {
  try {
    return (await CBRequest("GET", "/api/post/")).data;
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (post: any) => {
  return await CBRequest("POST", "/api/post/", {
    body: post,
  });
};

export const getAttendees = async (id: string) => {
  try {
    return (
      await CBRequest("GET", "/api/events/attendees/:id", {
        params: {
          id,
        },
      })
    ).data as AttendeeResponse[];
  } catch (err) {
    console.log(err);
  }
};

export const Search = async ({
  query,
  page = 1,
}: {
  query: string;
  page?: number;
}) => {
  try {
    return (
      await CBRequest("POST", "/api/search/", {
        body: { query, limit: 10, page },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};
export const flipPublic = async (id: string) => {
  try {
    return await CBRequest("POST", "/api/events/public/:id", {
      params: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
  }
};
