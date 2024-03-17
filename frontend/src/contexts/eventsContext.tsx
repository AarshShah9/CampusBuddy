import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useCallback } from "react";
import { CBRequest, uploadImageRequest } from "~/lib/CBRequest";
import { createEvent } from "~/screens/CreateEvent";
import { ImagePickerAsset } from "expo-image-picker";
import {
  getHomePageEvents,
  getProfilePageEvents,
  getSearchPageEvents,
} from "~/lib/apiFunctions/Events";
import { EventType } from "~/types/Events";

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

export type EventDetailsItem = {
  id: string;
  title: string;
  description: string;
  host: string;
  location: string;
  time: string;
  image: string;
  latitude: number;
  longitude: number;
};

type eventsContext = {
  getMainEvents: () => Promise<any>;
  createEvent: (event: createEvent, image: ImagePickerAsset) => Promise<any>;
  getAllMapEvents: () => Promise<any>;
  homePageEvents: EventType[];
  searchPageEvents: EventType[];
  profilePageEvents: EventType[];
  getEventDetails: (id: string) => Promise<any>;
};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { data: homePageEvents } = useQuery({
    queryKey: ["home-page-events"],
    queryFn: getHomePageEvents,
    initialData: [],
  });

  const { data: searchPageEvents } = useQuery({
    queryKey: ["search-page-events"],
    queryFn: getSearchPageEvents,
    initialData: [],
  });

  const { data: profilePageEvents } = useQuery({
    queryKey: ["profile-page-events"],
    queryFn: getProfilePageEvents,
    initialData: [],
  });

  const getMainEvents = useCallback(async () => {
    try {
      return await CBRequest("GET", "/api/events/mainPage");
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

  const getEventDetails = useCallback(async (id: string) => {
    try {
      return await CBRequest("GET", "/api/events/:id", {
        params: {
          id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <EventsContext.Provider
      value={{
        getMainEvents,
        createEvent,
        getAllMapEvents,
        searchPageEvents,
        homePageEvents,
        profilePageEvents,
        getEventDetails,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
