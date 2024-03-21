import {
  CBRequest,
  uploadImageRequest,
  uploadImagesRequest,
} from "../CBRequest";
import { ImagePickerAsset } from "expo-image-picker";
import { createEventType } from "~/screens/CreateEvent";
import { useCallback } from "react";
import { MarketPlaceItem } from "~/types/Events";

export async function getHomePageEvents() {
  return [];
}
export async function getSearchPageEvents() {
  let response = await CBRequest("GET", "/api/events/");
  return response.data;
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
  event: createEventType,
  image: ImagePickerAsset,
) => {
  try {
    return await uploadImageRequest("post", "/api/events/", image, {
      body: event,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllMapEvents = async () => {
  try {
    return await CBRequest("GET", "/api/events/mapEvents");
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

export const getAllPosts = async () => {
  try {
    return await CBRequest("GET", "/api/post/");
  } catch (err) {
    console.log(err);
  }
};

export const createPost = async (post: any) => {
  try {
    return await CBRequest("POST", "/api/post/", {
      body: post,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAttendees = async (id: string) => {
  try {
    return (
      await CBRequest("GET", "/api/events/attendees/:id", {
        params: {
          id,
        },
      })
    ).data;
  } catch (err) {
    console.log(err);
  }
};

export const createMarketPlaceItem = async (
  item: MarketPlaceItem,
  images?: ImagePickerAsset[],
) => {
  if (images) {
    try {
      return await uploadImagesRequest("post", "/api/item/", images, {
        body: item,
      });
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      return await CBRequest("post", "/api/item/", {
        body: item,
      });
    } catch (err) {
      console.log(err);
    }
  }
};
