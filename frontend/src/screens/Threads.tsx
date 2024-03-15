import { useEffect, useState } from "react";
import Map from "~/components/Map";
import useAppContext from "~/hooks/useAppContext";
import useEventsContext from "~/hooks/useEventsContext";
import { EventMapItem } from "~/contexts/eventsContext";

export default function Threads() {
  const { location } = useAppContext();
  const { getAllMapEvents } = useEventsContext();
  const [events, setEvents] = useState<EventMapItem[]>();

  useEffect(() => {
    getAllMapEvents().then((res) => {
      setEvents(res.data);
    });
  }, []);

  if (!location) {
    return null;
  }

  return (
    <Map
      currentLocation={{
        longitude: location?.coords?.longitude,
        latitude: location?.coords?.latitude,
      }}
      events={events}
    />
  );
}
