import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useThemeContext from "~/hooks/useThemeContext";
import EventDetails from "~/screens/EventDetails";
import Home from "~/screens/Home";

const Stack = createNativeStackNavigator();

export default function HomeScreenStack() {
  const { theme } = useThemeContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: theme.colors.onPrimary,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={Home}
        options={({ navigation }) => ({
          title: "Home",
          /* headerLeft: () => <DrawerIcon />,
                    headerRight: () => <UserIcon />, */
        })}
      />
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
