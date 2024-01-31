import useThemeContext from "~/hooks/useThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import LandingGroup from "./LandingGroup";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "~/screens/SplashScreen";
import Login from "~/screens/Login";
import StudentSignUp from "~/screens/StudentSignUp";

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { theme } = useThemeContext();

    return (
        <SafeAreaProvider>
            <NavigationContainer theme={theme}>
                <StatusBar style="auto" />
                <Stack.Navigator
                    screenOptions={{ headerShown: false }}
                    initialRouteName="SplashScreen"
                >
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="StudentSignUp" component={StudentSignUp} />
                    <Stack.Screen name="LandingGroup" component={LandingGroup} />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
