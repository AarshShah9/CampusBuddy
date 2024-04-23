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
import HelpScreen from "~/screens/HelpScreen";
import Analytics from "~/screens/Analytics";
import ReusableStackScreens from "~/components/ReusableStackScreens";
import { useLayoutEffect } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";

export default function ProfileGroup() {
    const { updateCurrentMaintab } = useNavigationContext();

    useLayoutEffect(() => updateCurrentMaintab("Profile"), [])
    
    return (
        <ProfileContextProvider>
            <ReusableStackScreens
                name="Profile" component={ProfileScreens}
                options={{ headerShown: false }}
            />
            <ProfileSettings />
            <ProfilePictureSettings />
        </ProfileContextProvider>
    )
}

const Stack = createNativeStackNavigator();

function ProfileScreens() {
    const { theme } = useThemeContext();
    const { userType } = useAuthContext();

    return (
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
            {userType === "Organization_Admin" && (
                <Stack.Screen
                    name="Analytics"
                    component={Analytics}
                    options={{
                        title: "Analytics",
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
            <Stack.Screen
                name="Help"
                component={HelpScreen}
                options={{
                    title: "Help",
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
    );
}
