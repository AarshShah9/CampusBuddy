import Header from "./Header";
import Home from "~/screens/Home";
import ReusableStackScreens from "~/components/ReusableStackScreens";
import useAuthContext from "~/hooks/useAuthContext";

export default function HomeGroup() {
  return (
    <ReusableStackScreens
      name="Home"
      component={Home}
      options={{ header: Header }}
    />
  );
}
