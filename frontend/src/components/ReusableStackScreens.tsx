import ProfilePage from "~/screens/ProfilePage";
import EventDetails from "~/screens/EventDetails";
import LookingForDetails from "~/screens/LookingForDetails";
import LookingForCommentsScreen from "~/screens/LookingForCommentsScreen";
import MarketPlaceDetail from "~/screens/MarketPlaceDetail";
import Attendees from "~/screens/Attendees";
import MapDetails from "~/screens/MapDetails";
import CreateEvent from "~/screens/CreateEvent";
import QRCodeScanner from "~/screens/QRCodeEventScanner";
import EventPricing from "~/screens/EventPricing";
import EventPayment from "~/screens/EventPayment";
import OrganizationProfile from "~/navigation/LandingGroup/BottomTabsGroup/OrganizationProfile";
import { createNativeStackNavigator, NativeStackNavigationOptions } from "@react-navigation/native-stack";
import useThemeContext from "~/hooks/useThemeContext";
import { CurrentMainTab } from "~/types/Navigation";
import { memo } from "react";

const Stack = createNativeStackNavigator();

type Props = {
    name: CurrentMainTab,
    component: () => JSX.Element | null,
    options?: NativeStackNavigationOptions
}

function ReusableStackScreens({ name, component, options }: Props) {
    const { theme } = useThemeContext();
    return (
        <Stack.Navigator>
            <Stack.Screen name={name} component={component} options={options}/>
            {/*  TODO ALL OF THESE SCREENS STACKING IS BOGGING DOWN THE APP */}
            <Stack.Screen
                name={`UserProfile-${name}`}
                component={ProfilePage}
                options={{
                    title: "",
                    headerShown: true,
                    headerBackTitle: "Home",
                    headerTintColor: theme.colors.onSecondary,
                    headerTitleStyle: {
                        color: theme.colors.onSecondary,
                    },
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
            <Stack.Screen
                name={`EventDetails-${name}`}
                component={EventDetails}
                options={{
                    headerTitleStyle: {
                        color: theme.colors.onSecondary,
                    },
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`LookingForDetails-${name}`}
                component={LookingForDetails}
                options={{
                    headerTitleStyle: {
                        color: theme.colors.onSecondary,
                    },
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`LookingForCommentsScreen-${name}`}
                component={LookingForCommentsScreen}
                options={{
                    headerTitleStyle: {
                        color: theme.colors.onSecondary,
                    },
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`MarketPlaceDetail-${name}`}
                component={MarketPlaceDetail}
                options={{
                    headerTitleStyle: {
                        color: theme.colors.onSecondary,
                    },
                    headerStyle: { backgroundColor: theme.colors.primary },
                    headerTitle: "",
                    headerShown: true,
                    headerBackTitle: "Back",
                    headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`Attendees-${name}`}
                component={Attendees}
                options={{
                    headerTitleStyle: {
                        color: theme.colors.onSecondary,
                    },
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
            <Stack.Screen
                name={`MapDetails-${name}`}
                component={MapDetails}
                options={{
                    headerTitleStyle: {
                        color: theme.colors.onSecondary,
                    },
                    presentation: "modal",
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
            <Stack.Screen
                name={`OrganizationProfile-${name}`}
                component={OrganizationProfile}
                options={{
                    title: "",
                    headerShown: true,
                    headerBackTitle: "Home",
                    headerTintColor: theme.colors.onSecondary,
                    headerTitleStyle: {
                        color: theme.colors.onSecondary,
                    },
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
            <Stack.Screen
                name={`EditEvent-${name}`}
                component={CreateEvent}
                options={{
                headerTitleStyle: {
                    color: theme.colors.onSecondary,
                },
                headerStyle: { backgroundColor: theme.colors.primary },
                headerTitle: "",
                headerShown: true,
                headerBackTitle: "Back",
                headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`QRCodeScanner-${name}`}
                component={QRCodeScanner}
                options={{
                headerTitleStyle: {
                    color: theme.colors.onSecondary,
                },
                headerStyle: { backgroundColor: theme.colors.primary },
                headerTitle: "",
                headerShown: true,
                headerBackTitle: "Back",
                headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`EventPricing-${name}`}
                component={EventPricing}
                options={{
                headerTitleStyle: {
                    color: theme.colors.onSecondary,
                },
                headerStyle: { backgroundColor: theme.colors.primary },
                headerTitle: "",
                headerShown: true,
                headerBackTitle: "Back",
                headerTintColor: theme.colors.onSecondary,
                }}
            />
            <Stack.Screen
                name={`EventPayment-${name}`}
                component={EventPayment}
                options={{
                headerTitleStyle: {
                    color: theme.colors.onSecondary,
                },
                presentation: "modal",
                headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
        </Stack.Navigator>
    )
}

export default memo(ReusableStackScreens)