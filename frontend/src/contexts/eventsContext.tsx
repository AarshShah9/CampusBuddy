import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { createContext } from "react";

type Event = {
    id: string,
    name: string
    date: string,
    location: string,
    clubName: string,
    picture: string
}

const mockEvents: Event[] = [
    {
        id: "1",
        name: "Ucalgary Hacks",
        date: "January 14",
        location: "University of Calgary",
        clubName: "CS Society",
        picture: "https://d2epenzoyf672m.cloudfront.net/pfp/hackathon.png"
    },
    {
        id: "2",
        name: "Pason Info Night",
        date: "January 20",
        location: "Schulich School of Engineering",
        clubName: "Tech Start",
        picture: "https://d2epenzoyf672m.cloudfront.net/pfp/pason.jpg"
    },
    {
        id: "3",
        name: "Dinos vs Golden Bears",
        date: "January 21",
        location: "McMahon Stadium",
        clubName: "Dinos Athletics",
        picture: "https://d2epenzoyf672m.cloudfront.net/pfp/dinos_football.jpg"
    },
    {
        id: "4",
        name: "Bill Gates Guest Lecture",
        date: "January 21",
        location: "MacEwan Hall",
        clubName: "University of Calgary",
        picture: "https://d2epenzoyf672m.cloudfront.net/pfp/bill_gates.jpg"
    },
    {
        id: "5",
        name: "SU Puppy Therapy",
        date: "January 22",
        location: "MacEwan Hall",
        clubName: "Students Union",
        picture: "https://d2epenzoyf672m.cloudfront.net/pfp/puppies.jpg"
    },
    {
        id: "6",
        name: "Career fair",
        date: "January 27",
        location: "MacEwan Hall",
        clubName: "Career Center",
        picture: "https://d2epenzoyf672m.cloudfront.net/pfp/career_fair.jpg"
    }
]

type eventsContext = {
    events: Event[]
};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const { data: events } = useQuery({
        queryKey: ['events'],
        queryFn: async () => mockEvents,
        initialData: []
    })

    return (
        <EventsContext.Provider value={{ events }}>
            {children}
        </EventsContext.Provider>
    );
};

export default EventsContext;
