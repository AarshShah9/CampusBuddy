import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren } from "react";
import { ImagePickerAsset } from "expo-image-picker";
import {
  attendEvent,
  createEvent,
  createMarketPlaceItem,
  createPost,
  getAllMapEvents,
  getAllPosts,
  getAttendees,
  getEventDetails,
  getHomePageEvents,
  getMainEvents,
  getProfilePageEvents,
  getSearchPageEvents,
  likeEvent,
} from "~/lib/apiFunctions/Events";
import {
  AttendeeResponse,
  EventDetailsProps,
  EventType,
  lookingForDetail,
  MarketPlaceItem,
  SearchPageEventType,
} from "~/types/Events";
import { createEventType } from "~/screens/CreateEvent";

type eventsContext = {
  getMainEvents: () => Promise<any>;
  createEvent: (
    event: createEventType,
    image: ImagePickerAsset,
  ) => Promise<any>;
  createPost: (post: lookingForDetail) => Promise<any>; // fix any on post type
  getAllMapEvents: () => Promise<any>;
  homePageEvents: EventType[];
  searchPageEvents: SearchPageEventType[];
  profilePageEvents: EventType[];
  getEventDetails: (id: string) => Promise<EventDetailsProps>;
  likeEvent: (id: string) => Promise<any>;
  attendEvent: (id: string) => Promise<any>;
  getAllPosts: () => Promise<any>;
  getAttendees: (id: string) => Promise<AttendeeResponse[]>;
  createMarketPlaceItem: (
    item: MarketPlaceItem,
    images?: ImagePickerAsset[],
  ) => Promise<any>;
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
        attendEvent,
        createPost,
        getAllPosts,
        getAttendees,
        createMarketPlaceItem,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
