import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header";
import ProfileTabs from "./ProfileTabs";
import { ProfileContextProvider } from "~/contexts/profileContext";
import ProfileSettings from "~/screens/ProfileSettings";
import ProfilePictureSettings from "~/screens/ProfilePictureSettings";
import Settings, { SettingsHeader } from "~/screens/Settings";

const Stack = createNativeStackNavigator();

export default function ProfileGroup() {
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
          options={{ title: "Settings", header: SettingsHeader }}
        />
      </Stack.Navigator>
      <ProfileSettings />
      <ProfilePictureSettings />
    </ProfileContextProvider>
  );
}
