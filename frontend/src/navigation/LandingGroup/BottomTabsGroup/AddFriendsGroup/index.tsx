import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useLayoutEffect } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";
import useThemeContext from "~/hooks/useThemeContext";
import CreateScreen from "~/screens/CreateScreen";

const Stack = createNativeStackNavigator();

export default function AddFriendsGroup() {
  const { updateCurrentMaintab } = useNavigationContext();

  useLayoutEffect(() => updateCurrentMaintab("CreatePost"), [])
  
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