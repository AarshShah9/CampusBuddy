import { useCallback, useEffect, useState } from "react";
import { CBRequest } from "~/lib/CBRequest";
import Map from "~/components/Map";
import useAppContext from "~/hooks/useAppContext";

export default function Threads() {
  const { getLocationPermission, getLocation } = useAppContext();
  const [location, setLocation] = useState<Record<string, any>>({
    latitude: 51.08660107358039,
    longitude: -114.12847416818332,
  });

  const onClickHandler = useCallback(async () => {
    CBRequest("GET", "/api/user/verify", {})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    (async () => {
      console.log("Getting location permission");
      await getLocationPermission();
      await getLocation();
    })();
  }, []);

  return (
    <Map
      currentLocation={{
        longitude: location.longitude,
        latitude: location.latitude,
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
