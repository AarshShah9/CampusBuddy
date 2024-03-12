import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { createContext, useCallback } from "react";
import { getHomePageEvents, getProfilePageEvents, getSearchPageEvents } from "~/lib/apiFunctions/Events";
import { EventType } from "~/types/Events";


type eventsContext = {
  homePageEvents: EventType[],
  searchPageEvents: EventType[],
  profilePageEvents: EventType[]
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

//   type handleEventPressArg = {
//     type: 'home' | 'search' | 'profile',
//     id: string
//   }
//   const handleEventPress = ({ type, id }: handleEventPressArg) => {
//     const events = type === 'home' ? homePageEvents : type === 'search' ? searchPageEvents : profilePageEvents
//     const event = events.find(event => event.id === id) 
//   }

  return (
    <EventsContext.Provider value={{ homePageEvents, searchPageEvents, profilePageEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
