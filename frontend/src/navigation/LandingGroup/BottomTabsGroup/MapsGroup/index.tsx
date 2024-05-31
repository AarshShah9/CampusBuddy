import ReusableStackScreens from "~/components/ReusableStackScreens";
import MapsPage from "~/screens/MapsPage";

export default function MapsGroup() {
  return (
    <ReusableStackScreens
      name="Maps"
      component={MapsPage}
      options={{ headerShown: false }}
    />
  );
}
