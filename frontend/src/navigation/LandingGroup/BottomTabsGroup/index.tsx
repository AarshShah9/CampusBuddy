import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
    createMaterialBottomTabNavigator,
    MaterialBottomTabNavigationOptions,
} from "@react-navigation/material-bottom-tabs";
import useThemeContext from "~/hooks/useThemeContext";
import SearchGroup from "./SearchGroup";
import AddFriendsGroup from "./AddFriendsGroup";
import ProfileGroup from "./ProfileGroup";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import ThreadsGroup from "./ThreadsGroup";
import EventDetails from "~/screens/EventDetails";
import MapDetails from "~/screens/MapDetails";
import Attendees from "~/screens/Attendees";
import ProfilePage from "~/screens/ProfilePage";
import MarketPlaceDetail from "~/screens/MarketPlaceDetail";
import LookingForDetails from "~/screens/LookingForDetails";
import LookingForCommentsScreen from "~/screens/LookingForCommentsScreen";
import CreateEvent from "~/screens/CreateEvent";
import QRCodeScanner from "~/screens/QRCodeEventScanner";
import EventPayment from "~/screens/EventPayment";
import Analytics from "~/screens/Analytics";
import EventPricing from "~/screens/EventPricing";
import OrganizationProfile from "./OrganizationProfile";
import HomeGroup from "./HomeGroup/";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const BottomTab = createMaterialBottomTabNavigator();

function BottomTabsComponent() {
    const { theme } = useThemeContext();
    
    return (
        <BottomTab.Navigator
            barStyle={{
                backgroundColor: theme.colors.background,
                height: 88,
            }}
            labeled={false}
            initialRouteName="Home"
            screenOptions={screenOptions}
            >
            <BottomTab.Screen name="Home" component={HomeGroup} />
            <BottomTab.Screen name="Search" component={SearchGroup} />
            <BottomTab.Screen name="Add Friends" component={AddFriendsGroup} />
            <BottomTab.Screen name="Threads" component={ThreadsGroup} />
            <BottomTab.Screen name="Profile" component={ProfileGroup} />
        </BottomTab.Navigator>
    )
}

type ScreenOptions = (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
}) => MaterialBottomTabNavigationOptions;

const screenOptions: ScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color, focused }) => {
        let iconName: any;
        if (route.name === "Home") iconName = focused ? "home" : "home-outline";
        else if (route.name === "Search")
            iconName = focused ? "search" : "search-outline";
        else if (route.name === "Add Friends")
            iconName = focused ? "add-circle" : "add-circle-outline";
        else if (route.name === "Threads")
            return (
                // TODO fix icon
                <Entypo
                    name="map"
                    size={24}
                    {...{
                        color,
                    }}
                />
            );
        else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
        else if (route.name === "Marketplace")
            return (
                <MaterialCommunityIcons
                    {...{
                        name: focused ? "shopping" : "shopping-outline",
                        size: 24,
                        color,
                    }}
                />
            );
        else if (route.name === "Settings")
            iconName = focused ? "settings" : "ios-settings-sharp";

        return <Ionicons {...{ name: iconName, size: 24, color }} />;
    },
});

const Stack = createNativeStackNavigator();

export default function BottomTabGroup() {
    const { theme } = useThemeContext();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="BottomTabs"
                component={BottomTabsComponent}
            />
            {/*  TODO ALL OF THESE SCREENS STACKING IS BOGGING DOWN THE APP */}
            <Stack.Screen
                name="UserProfile"
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
                name="EventDetails"
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
                name="LookingForDetails"
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
                name="LookingForCommentsScreen"
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
                name="MarketPlaceDetail"
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
                name="Attendees"
                component={Attendees}
                options={{
                    headerTitleStyle: {
                        color: theme.colors.onSecondary,
                    },
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
            <Stack.Screen
                name="MapDetails"
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
                name="OrganizationProfile"
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
                name={"EditEvent"}
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
                name={"QRCodeScanner"}
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
                name={"EventPricing"}
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
                name={"EventPayment"}
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
    );
}
