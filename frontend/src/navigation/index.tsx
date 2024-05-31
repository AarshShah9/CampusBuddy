import useThemeContext from "~/hooks/useThemeContext";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "~/screens/SplashScreen";
import AuthenticationGroup from "./AuthenticationGroup";
import LandingGroup from "./LandingGroup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContextProvider } from "~/contexts/navigationContext";
import Interests from "~/screens/Interests";
import useAuthContext from "~/hooks/useAuthContext";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const { theme } = useThemeContext();

  return (
    <NavigationContainer theme={theme}>
      <StatusBar style="auto" />
      <NavigationContextProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen
            name="AuthenticationGroup"
            component={AuthenticationGroup}
          />
          <Stack.Screen
            name={"Interests"}
            component={Interests}
            options={{
              title: "",
              headerShown: true,
              headerBackTitle: "Back",
              headerTintColor: theme.colors.onSecondary,
              headerStyle: { backgroundColor: theme.colors.primary },
            }}
          />
          <Stack.Screen name="LandingGroup" component={LandingGroup} />
        </Stack.Navigator>
      </NavigationContextProvider>
    </NavigationContainer>
  );
}
