import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "~/screens/Login";
import StudentSignUp from "~/screens/StudentSignUp";

const Stack = createNativeStackNavigator();

export default function AuthenticationGroup() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="StudentSignUp" component={StudentSignUp} />
    </Stack.Navigator>
  );
}
