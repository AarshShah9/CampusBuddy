import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useThemeContext from "~/hooks/useThemeContext";
import AddFriends from "~/screens/AddFriends";

const Stack = createNativeStackNavigator();

export default function AddFriendsScreenStack() {
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
        name="AddFriendsScreen"
        component={AddFriends}
        options={({ navigation }) => ({
          title: "Add Friends",
          /* headerLeft: () => <DrawerIcon />,
                    headerRight: () => <UserIcon />, */
        })}
      />
    </Stack.Navigator>
  );
}
