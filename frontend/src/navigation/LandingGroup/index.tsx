import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReactQueryProvider from "~/contexts/queryContext";
import { EventsContextProvider } from "~/contexts/eventsContext";
import BottomTabsGroup from "./BottomTabsGroup";
import EventDetails from "~/screens/EventDetails";
import useThemeContext from "~/hooks/useThemeContext";
import MessagesGroup from "./MessagesGroup";
import MapDetails from "~/screens/MapDetails";
import Attendees from "~/screens/Attendees";
import ProfilePage from "~/screens/ProfilePage";
import MarketPlaceDetail from "~/screens/MarketPlaceDetail";
import LookingForDetails from "~/screens/LookingForDetails";
import LookingForCommentsScreen from "~/screens/LookingForCommentsScreen";
import OrganizationProfile from "./BottomTabsGroup/OrganizationProfile";
import { ChatsContextProvider } from "~/contexts/chatsContext";
import { ChatContextProvider } from "~/contexts/chatContext";
import EventSettings from "~/screens/EventSettings";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import CreateEvent from "~/screens/CreateEvent";
import QRCodeScanner from "~/screens/QRCodeEventScanner";
import ItemSettings from "~/screens/ItemSettings";
import PostSettings from "~/screens/PostSettings";
import { StripeProvider } from "@stripe/stripe-react-native";
import { PUBLISHABLE_KEY } from "@env";
import EventPayment from "~/screens/EventPayment";
import Analytics from "~/screens/Analytics";
import EventPricing from "~/screens/EventPricing";

const Stack = createNativeStackNavigator();

export default function LandingGroup() {
    const { theme } = useThemeContext();

    return (
        <ReactQueryProvider>
            <ChatsContextProvider>
                <ChatContextProvider>
                    <StripeProvider
                        publishableKey={PUBLISHABLE_KEY}
                        merchantIdentifier="merchant.com.campusbuddy" // todo
                        urlScheme="your-url-scheme" // todo
                    >
                        <EventsContextProvider>
                            <BottomSheetModalProvider>
                                <Stack.Navigator screenOptions={{ headerShown: false }}>
                                    <Stack.Screen name="BottomTabsGroup" component={BottomTabsGroup} />
                                    <Stack.Screen name="Messages" component={MessagesGroup} />
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
                                <EventSettings />
                                <ItemSettings />
                                <PostSettings />
                            </BottomSheetModalProvider>
                        </EventsContextProvider>
                    </StripeProvider>
                </ChatContextProvider>
            </ChatsContextProvider>
        </ReactQueryProvider>
    );
}