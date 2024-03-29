import { createContext, PropsWithChildren } from "react";

type eventsContext = {};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  return <EventsContext.Provider value={{}}>{children}</EventsContext.Provider>;
};

export default EventsContext;
