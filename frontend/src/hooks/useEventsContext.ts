import { useContext } from "react";
import EventsContext from "~/contexts/eventsContext";

export default function useEventsContext() {
  const contextValues = useContext(EventsContext);

  if (!contextValues)
    throw new Error(
      "useEventsContext must be used within a EventsContextProvider",
    );

  return contextValues;
}
