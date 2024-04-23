import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";
import useThemeContext from "~/hooks/useThemeContext";
import MapsPage from "~/screens/MapsPage";

const Stack = createNativeStackNavigator();

export default function MapsGroup() {
  const { updateCurrentMaintab } = useNavigationContext();

  useLayoutEffect(() => updateCurrentMaintab("Maps"), [])

  const { theme } = useThemeContext();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.onSecondary,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen
        name="MapsScreen"
        component={MapsPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
