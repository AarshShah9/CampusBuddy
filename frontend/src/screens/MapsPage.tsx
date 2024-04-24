import { useCallback, useEffect } from "react";
import Map from "~/components/Map";
import useAppContext from "~/hooks/useAppContext";
import useLoadingContext from "~/hooks/useLoadingContext";
import { useQuery } from "@tanstack/react-query";
import { getAllMapEvents } from "~/lib/apiFunctions/Events";
import { useFocusEffect } from "@react-navigation/native";

export default function MapsPage() {
  const { location } = useAppContext();
  const { startLoading, stopLoading } = useLoadingContext();

  const {
    data: { events, items },
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["map-page-events"],
    queryFn: getAllMapEvents,
    initialData: [],
  });

  useEffect(() => {
    if (isLoading || !location) {
      startLoading();
    }

    if (isSuccess && !isLoading && location) {
      stopLoading();
    }

    if (isError) {
      console.error("An error occurred:", error);
      stopLoading();
    }
  }, [
    isLoading,
    isError,
    error,
    startLoading,
    stopLoading,
    isSuccess,
    location,
  ]);

  // TODO Prevent this from firing twice on initial load
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

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
