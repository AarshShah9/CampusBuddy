import React from "react";
import useLoadingContext from "~/hooks/useLoadingContext";
import VerticalScrollView from "~/components/VerticalScrollView";

export default function Home() {
  const { startLoading, stopLoading } = useLoadingContext();

  return <VerticalScrollView />;
}
