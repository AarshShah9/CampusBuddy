import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "~/screens/Profile";
import Header from "./Header";
import ProfileTabs from "./ProfileTabs";

const Stack = createNativeStackNavigator();

export default function ProfileScreenStack() {
  return (
    <Stack.Navigator screenOptions={{ header: Header }}>
      <Stack.Screen
        name="ProfileTabs"
        component={ProfileTabs}
        options={({ navigation }) => ({
          title: "Profile",
          /* headerLeft: () => <DrawerIcon />,
                    headerRight: () => <UserIcon />, */
        })}
      />
    </Stack.Navigator>
  );
}
