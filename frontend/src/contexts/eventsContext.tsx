import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useCallback, useState } from "react";
import { mockSearchEvents } from "~/mockData/EventData";
import { CBRequest, uploadImageRequest } from "~/lib/CBRequest";
import { createEvent } from "~/screens/CreateEvent";
import { ImagePickerAsset } from "expo-image-picker";

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  clubName: string;
  picture: string;
};

export type EventData = {
  title: string;
  id: string;
  items: EventItem[];
};

export type EventItem = {
  id: string;
  title: string;
  time?: string;
  location?: string;
  host?: string;
  image: string;
};

export type EventMapItem = {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
  description: string;
};

type lookingForDetail = {
  title: string;
  description: string;
  numberOfSpots: number;
  expiresAt: Date;
};

type eventsContext = {
  events: Event[];
  getMainEvents: () => Promise<any>;
  createEvent: (event: createEvent, image: ImagePickerAsset) => Promise<any>;
  createPost: (post: lookingForDetail) => Promise<any>; // fix any on post type
  getAllMapEvents: () => Promise<any>;
  getAllPosts: () => Promise<any>;
};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { data: events } = useQuery({
    queryKey: ["events"],
    queryFn: async () => mockSearchEvents,
    initialData: [],
  });

  const getMainEvents = useCallback(async () => {
    try {
      return await CBRequest("GET", "/api/events/mainPage");
    } catch (err) {
      console.log(err);
    }
  }, []);

  const createPost = useCallback(async (post: any) => {
    try {
      return await CBRequest("POST", "/api/post/", {
        body: post,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  const createEvent = useCallback(
    async (event: createEvent, image: ImagePickerAsset) => {
      try {
        return await uploadImageRequest("post", "/api/events/", image, {
          body: event,
        });
      } catch (err) {
        console.log(err);
      }
    },
    [],
  );

  const getAllMapEvents = useCallback(async () => {
    try {
      return await CBRequest("GET", "/api/events/mapEvents");
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getAllPosts = useCallback(async () => {
    try {
      return await CBRequest("GET", "/api/post/");
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <EventsContext.Provider
      value={{
        events,
        getMainEvents,
        createEvent,
        getAllMapEvents,
        createPost,
        getAllPosts,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
