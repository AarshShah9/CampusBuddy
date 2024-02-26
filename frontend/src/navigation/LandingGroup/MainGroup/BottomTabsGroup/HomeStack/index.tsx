import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useThemeContext from "~/hooks/useThemeContext";
import Header from "./Header";
import EventDetails from "~/screens/EventDetails";
import Home from "~/screens/Home";

const Stack = createNativeStackNavigator();

export default function HomeScreenStack() {
    const { theme } = useThemeContext();
    return (
        <Stack.Navigator screenOptions={{ header: Header }}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen
                name="EventDetails"
                component={EventDetails}
                options={{
                    presentation: "modal",
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
        </Stack.Navigator>
    );
}