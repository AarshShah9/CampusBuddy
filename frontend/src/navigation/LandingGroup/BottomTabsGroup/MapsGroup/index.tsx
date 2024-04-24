import { useEffect, useLayoutEffect } from "react";
import ReusableStackScreens from "~/components/ReusableStackScreens";
import useNavigationContext from "~/hooks/useNavigationContext";
import MapsPage from "~/screens/MapsPage";

export default function MapsGroup() {
  const { updateCurrentMaintab } = useNavigationContext();

  useEffect(() => updateCurrentMaintab("Maps"), []);

  return (
    <ReusableStackScreens
      name="Maps"
      component={MapsPage}
      options={{ headerShown: false }}
    />
  );
}
