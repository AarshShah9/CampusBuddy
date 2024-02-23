import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { createContext } from "react";
import { mockSearchEvents } from "~/mockData/EventData";

type Event = {
    id: string,
    name: string
    date: string,
    location: string,
    clubName: string,
    picture: string
}

type eventsContext = {
    events: Event[]
};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const { data: events } = useQuery({
        queryKey: ['events'],
        queryFn: async () => mockSearchEvents,
        initialData: []
    })

    return (
        <EventsContext.Provider value={{ events }}>
            {children}
        </EventsContext.Provider>
    );
};

export default EventsContext;