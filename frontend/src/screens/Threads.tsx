import { useEffect, useState } from "react";
import Map from "~/components/Map";
import useAppContext from "~/hooks/useAppContext";
import useEventsContext from "~/hooks/useEventsContext";

export default function Threads() {
  const { location } = useAppContext();
  const { getAllMapEvents } = useEventsContext();
  const [events, setEvents] = useState<any>();

  useEffect(() => {
    getAllMapEvents().then((res) => {
      console.log("HEREEE!", res);
      setEvents(res);
    });
  }, []);

  return (
    <Map
      currentLocation={{
        longitude: location?.coords?.longitude ?? 52,
        latitude: location?.coords?.latitude ?? -110,
      }}
      events={[
        {
          latitude: 51.09660107358039,
          longitude: -114.12847416818332,
          title: "Some Event",
          description: "Some cool event",
          onClick: () => {
            console.log("Clicked on current location");
          },
        },
        {
          latitude: 52.08660107358039,
          longitude: -114.12847416818332,
          title: "Random Location",
          description: "IDEK",
        },
      ]}
    />
  );
}
