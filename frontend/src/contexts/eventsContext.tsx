import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren } from "react";
import { ImagePickerAsset } from "expo-image-picker";
import {
  createEvent,
  getAllMapEvents,
  getEventDetails,
  getHomePageEvents,
  getMainEvents,
  getProfilePageEvents,
  getSearchPageEvents,
  likeEvent,
} from "~/lib/apiFunctions/Events";
import { EventType } from "~/types/Events";
import { createEventType } from "~/screens/CreateEvent";

type eventsContext = {
  getMainEvents: () => Promise<any>;
  createEvent: (
    event: createEventType,
    image: ImagePickerAsset,
  ) => Promise<any>;
  getAllMapEvents: () => Promise<any>;
  homePageEvents: EventType[];
  searchPageEvents: EventType[];
  profilePageEvents: EventType[];
  getEventDetails: (id: string) => Promise<any>;
  likeEvent: (id: string) => Promise<any>;
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
        likeEvent,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
