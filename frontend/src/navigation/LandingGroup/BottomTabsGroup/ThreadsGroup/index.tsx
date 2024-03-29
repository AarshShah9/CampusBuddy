import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useThemeContext from "~/hooks/useThemeContext";
import MapsPage from "~/screens/MapsPage";

const Stack = createNativeStackNavigator();

export default function ThreadsGroup() {
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
