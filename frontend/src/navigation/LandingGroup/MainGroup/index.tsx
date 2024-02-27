import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabsGroup from "./BottomTabsGroup";
import useThemeContext from "~/hooks/useThemeContext";
import { EventsContextProvider } from "~/contexts/eventsContext";
import EventDetails from "~/screens/EventDetails";

const Stack = createNativeStackNavigator();

export default function MainGroup() {
    const { theme } = useThemeContext();

    return (
        <EventsContextProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="BottomTabsGroup"
                    component={BottomTabsGroup}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="EventDetails"
                    component={EventDetails}
                    options={{
                        headerTitleStyle: {
                            color: theme.colors.onSecondary
                        },
                        presentation: "modal",
                        headerStyle: { backgroundColor: theme.colors.primary },
                    }}
                />
            </Stack.Navigator>
        </EventsContextProvider>
    );
}
