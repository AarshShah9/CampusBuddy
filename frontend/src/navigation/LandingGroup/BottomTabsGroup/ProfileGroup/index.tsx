import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header";
import ProfileTabs from "./ProfileTabs";
import { ProfileContextProvider } from "~/contexts/profileContext";
import ProfileSettings from "~/screens/ProfileSettings";
import ProfilePictureSettings from "~/screens/ProfilePictureSettings";
import Settings from "~/screens/Settings";
import useThemeContext from "~/hooks/useThemeContext";

const Stack = createNativeStackNavigator();

export default function ProfileGroup() {
  const { theme } = useThemeContext();

  return (
    <ProfileContextProvider>
      <Stack.Navigator>
        <Stack.Screen
          name="ProfileTabs"
          component={ProfileTabs}
          options={{
            title: "Profile",
            header: Header,
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            title: "Settings",
            headerShown: true,
            headerBackTitle: "Home",
            headerTintColor: theme.colors.onSecondary,
            headerTitleStyle: {
              color: theme.colors.onSecondary,
            },
            headerStyle: {
              backgroundColor: theme.colors.primary,
            },
          }}
        />
      </Stack.Navigator>
      <ProfileSettings />
      <ProfilePictureSettings />
    </ProfileContextProvider>
  );
}
