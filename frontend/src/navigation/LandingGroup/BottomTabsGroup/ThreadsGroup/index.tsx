import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useThemeContext from "~/hooks/useThemeContext";
import Threads from "~/screens/Threads";

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
        name="ThreadsScreen"
        component={Threads}
        options={{ title: "Event Map" }}
      />
    </Stack.Navigator>
  );
}
