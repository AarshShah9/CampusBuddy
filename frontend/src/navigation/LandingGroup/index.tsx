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
import OrganizationProfile from "~/screens/OrganizationProfile";

const Stack = createNativeStackNavigator();

export default function LandingGroup() {
    const { theme } = useThemeContext();

  return (
    <ReactQueryProvider>
      <EventsContextProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="BottomTabsGroup" component={BottomTabsGroup} />
          <Stack.Screen name="Messages" component={MessagesGroup} />
          <Stack.Screen
            name="UserProfile"
            component={ProfilePage}
            options={{
              title: "Profile",
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
                            title: 'Organization Profile',
                            headerShown: true,
                            headerBackTitle: 'Home',
                            headerTintColor: theme.colors.onSecondary,
                            headerTitleStyle: {
                                color: theme.colors.onSecondary,
                            },
                            headerStyle: { backgroundColor: theme.colors.primary }
                        }}
                    />
        </Stack.Navigator>
      </EventsContextProvider>
    </ReactQueryProvider>
  );
}
