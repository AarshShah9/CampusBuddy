import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReactQueryProvider from "~/contexts/queryContext";
import { EventsContextProvider } from "~/contexts/eventsContext";
import BottomTabsGroup from "./BottomTabsGroup";
import EventDetails from "~/screens/EventDetails";
import useThemeContext from "~/hooks/useThemeContext";
import MessagesGroup from "./MessagesGroup";
import MapDetails from "~/screens/MapDetails";
import Attendees from "~/screens/Attendees";
import LookingForDetails from "~/screens/LookingForDetails";

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
            name="EventDetails"
            component={EventDetails}
            options={{
              headerTitleStyle: {
                color: theme.colors.onSecondary,
              },
              presentation: "modal",
              headerStyle: { backgroundColor: theme.colors.primary },
            }}
          />

          <Stack.Screen
            name="LookingForDetails"
            component={LookingForDetails}
            options={{
              headerTitleStyle: {
                color: theme.colors.onSecondary,
              },
              presentation: "modal",
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
            name="Attendees"
            component={Attendees}
            options={{
              headerTitleStyle: {
                color: theme.colors.onSecondary,
              },
              presentation: "modal",
              headerStyle: { backgroundColor: theme.colors.primary },
            }}
          />
        </Stack.Navigator>
      </EventsContextProvider>
    </ReactQueryProvider>
  );
}
