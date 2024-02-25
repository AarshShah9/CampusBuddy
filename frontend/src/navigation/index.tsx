import useThemeContext from "~/hooks/useThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "~/screens/SplashScreen";
import AuthenticationGroup from "./AuthenticationGroup";
import LandingGroup from "./LandingGroup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { theme } = useThemeContext();

    return (
        <NavigationContainer theme={theme}>
            <StatusBar style="auto" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="SplashScreen" component={SplashScreen} />
                <Stack.Screen name="AuthenticationGroup" component={AuthenticationGroup} />
                <Stack.Screen name="LandingGroup" component={LandingGroup} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
