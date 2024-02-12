import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useThemeContext from "~/hooks/useThemeContext";
import Search from "~/screens/Search";

const Stack = createNativeStackNavigator();

export default function SearchScreenStack() {
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
        name="SearchScreen"
        component={Search}
        options={({ navigation }) => ({
          title: "Search",
          /* headerLeft: () => <DrawerIcon />,
                    headerRight: () => <UserIcon />, */
        })}
      />
    </Stack.Navigator>
  );
}
