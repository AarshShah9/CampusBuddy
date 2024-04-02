import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header";
import SearchTabs from "./SearchTabs";
import useAuthContext from "~/hooks/useAuthContext";
import Events from "~/screens/Events";

const Stack = createNativeStackNavigator();

export default function SearchGroup() {
  const { userType } = useAuthContext();

  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      {userType === "Student" && (
        <Stack.Screen name="SearchTabs" component={SearchTabs} />
      )}
      {userType === "Organization_Admin" && (
        <Stack.Screen name="Events" component={Events} />
      )}
      <Stack.Screen name="Hidden" component={() => null} />
    </Stack.Navigator>
  );
}
