import { useEffect, useState } from "react";
import Map from "~/components/Map";
import useAppContext from "~/hooks/useAppContext";
import useEventsContext from "~/hooks/useEventsContext";
import { EventMapItem } from "~/contexts/eventsContext";
import useLoadingContext from "~/hooks/useLoadingContext";

export default function Threads() {
  const { location } = useAppContext();
  const { startLoading, stopLoading } = useLoadingContext();
  const { getAllMapEvents } = useEventsContext();
  const [events, setEvents] = useState<EventMapItem[]>();

  useEffect(() => {
    startLoading();
    getAllMapEvents().then((res) => {
      setEvents(res.data);
    });
    stopLoading();
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
