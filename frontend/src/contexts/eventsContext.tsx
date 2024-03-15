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

type eventsContext = {
  getMainEvents: () => Promise<any>;
  createEvent: (event: createEvent, image: ImagePickerAsset) => Promise<any>;
  getAllMapEvents: () => Promise<any>;
  homePageEvents: EventType[];
  searchPageEvents: EventType[];
  profilePageEvents: EventType[];
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

  return (
    <EventsContext.Provider
      value={{ getMainEvents, createEvent, getAllMapEvents, searchPageEvents, homePageEvents, profilePageEvents }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;

//   type handleEventPressArg = {
//     type: 'home' | 'search' | 'profile',
//     id: string
//   }
//   const handleEventPress = ({ type, id }: handleEventPressArg) => {
//     const events = type === 'home' ? homePageEvents : type === 'search' ? searchPageEvents : profilePageEvents
//     const event = events.find(event => event.id === id)
//   }
