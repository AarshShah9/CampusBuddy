import Header from "./Header";
import Home from "~/screens/Home";
import ReusableStackScreens from "~/components/ReusableStackScreens";

export default function HomeGroup() {
  return (
    <ReusableStackScreens
      name="Home"
      component={Home}
      options={{ header: Header }}
    />
  );
}
