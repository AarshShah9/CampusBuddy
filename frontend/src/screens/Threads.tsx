import { useEffect, useState } from "react";
import Map from "~/components/Map";
import useAppContext from "~/hooks/useAppContext";
import useEventsContext from "~/hooks/useEventsContext";
import useLoadingContext from "~/hooks/useLoadingContext";
import { EventMapItem } from "~/types/Events";
import { useQuery } from "@tanstack/react-query";
import { getAllMapEvents } from "~/lib/apiFunctions/Events";

export default function Threads() {
  const { location } = useAppContext();
  const { startLoading, stopLoading } = useLoadingContext();

  const {
    data: { events, items },
    isLoading,
    isError,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["search-page-events"],
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
