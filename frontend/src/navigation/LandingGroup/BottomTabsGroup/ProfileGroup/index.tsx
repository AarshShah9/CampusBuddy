import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header";
import ProfileTabs from "./ProfileTabs";
import { ProfileContextProvider } from "~/contexts/profileContext";
import ProfileSettings from "~/screens/ProfileSettings";
import ProfilePictureSettings from "~/screens/ProfilePictureSettings";
import Settings from "~/screens/Settings";
import useThemeContext from "~/hooks/useThemeContext";
import useAuthContext from "~/hooks/useAuthContext";
import OrganizationSettings from "~/screens/OrganizationSettings";
import OrganizationProfileHeader from "~/navigation/LandingGroup/BottomTabsGroup/OrganizationProfile/Header";
import OrganizationEvents from "~/screens/OrganizationEvents";

const Stack = createNativeStackNavigator();

export default function ProfileGroup() {
  const { theme } = useThemeContext();
  const { userType } = useAuthContext();

  return (
    <ProfileContextProvider>
      <Stack.Navigator>
        {userType === "Student" && (
          <Stack.Screen
            name="ProfileTabs"
            component={ProfileTabs}
            options={{
              title: "Profile",
              header: Header,
            }}
          />
        )}
        {userType === "Student" && (
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
        )}
        {userType === "Organization_Admin" && (
          <Stack.Screen
            name="OrganizationProfileTabs"
            component={OrganizationEvents}
            initialParams={{ self: true, id: "0" }}
            options={{
              header: OrganizationProfileHeader,
            }}
          />
        )}
        {userType === "Organization_Admin" && (
          <Stack.Screen
            name="OrganizationSettings"
            component={OrganizationSettings}
            options={{
              title: "Organization Settings",
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
        )}
        <Stack.Screen name="HiddenProfile" component={() => null} />
      </Stack.Navigator>
      <ProfileSettings />
      <ProfilePictureSettings />
    </ProfileContextProvider>
  );
}
