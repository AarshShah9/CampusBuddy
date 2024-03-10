import { useQuery } from "@tanstack/react-query";
import { createContext, PropsWithChildren, useCallback } from "react";
import { mockSearchEvents } from "~/mockData/EventData";
import { CBRequest } from "~/lib/CBRequest";

type Event = {
  id: string;
  name: string;
  date: string;
  location: string;
  clubName: string;
  picture: string;
};

type EventResponse = {
  id: string;
  userId: string;
  organizationId: string;
  createdAt: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  isPublic: boolean;
  status: string;
  image: string;
  locationPlaceId: string;
};

type institutionResponse = {
  id: string;
  organizationName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  image: string;
  institutionId: string;
};

type MainEventPageResponse = {
  attendingEvents: EventResponse[];
  trendingEvents: EventResponse[];
  verifiedOrganizations: institutionResponse[];
};

type eventsContext = {
  events: Event[];
  getMainEvents: () => Promise<any>;
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

  return (
    <EventsContext.Provider value={{ events, getMainEvents }}>
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
