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
  getMarketPlaceItems,
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

type eventsContext = {};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  return <EventsContext.Provider value={{}}>{children}</EventsContext.Provider>;
};

export default EventsContext;
