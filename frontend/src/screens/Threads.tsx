import { useEffect, useState } from "react";
import Map from "~/components/Map";
import useAppContext from "~/hooks/useAppContext";
import useEventsContext from "~/hooks/useEventsContext";
import useLoadingContext from "~/hooks/useLoadingContext";
import { EventMapItem } from "~/types/Events";

export default function Threads() {
  const { location } = useAppContext();
  const { startLoading, stopLoading } = useLoadingContext();
  const { getAllMapEvents } = useEventsContext();
  const [events, setEvents] = useState<EventMapItem[]>();
  const [items, setItems] = useState<EventMapItem[]>();

  useEffect(() => {
    startLoading();
    getAllMapEvents().then((res) => {
      setEvents(res.data.events);
      setItems(res.data.items);
    });
    if (location) {
      stopLoading();
    }
  }, [location]);

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
      items={items}
    />
  );
}
