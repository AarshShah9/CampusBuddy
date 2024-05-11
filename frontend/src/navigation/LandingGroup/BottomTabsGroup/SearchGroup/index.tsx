import Header from "./Header";
import SearchTabs from "./SearchTabs";
import useAuthContext from "~/hooks/useAuthContext";
import Events from "~/screens/Events";
import ReusableStackScreens from "~/components/ReusableStackScreens";

export default function SearchGroup() {
  const { userType } = useAuthContext();

  const data =
    userType === "Student"
      ? { component: SearchTabs, options: { header: Header } }
      : { component: Events, options: undefined };

  return (
    <ReusableStackScreens
      name="Search"
      component={data.component}
      options={data.options}
    />
  );
}