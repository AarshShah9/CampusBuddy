import { createNativeStackNavigator } from "@react-navigation/native-stack";
import useThemeContext from "~/hooks/useThemeContext";
import CreateScreen from "~/screens/CreateScreen";

const Stack = createNativeStackNavigator();

export default function AddFriendsScreenStack() {
  const { theme } = useThemeContext();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CreateScreen" component={CreateScreen} />
    </Stack.Navigator>
  );
}
