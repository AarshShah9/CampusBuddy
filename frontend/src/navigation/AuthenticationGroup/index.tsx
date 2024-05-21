import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContextProvider } from "~/contexts/authContext";
import EmailConfirmationNotice from "~/screens/EmailConfirmationNotice";
import Login from "~/screens/Login";
import OrgCreationConfirmation from "~/screens/OrgCreationConfirmation";
import OrganizationSignUp from "~/screens/OrganizationScreen";
import StudentSignUp from "~/screens/StudentSignUp";
import useThemeContext from "~/hooks/useThemeContext";

const Stack = createNativeStackNavigator();

export default function AuthenticationGroup() {
  const { theme } = useThemeContext();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen
        name="StudentSignUp"
        component={StudentSignUp}
        options={{
          title: "Student Sign Up",
          headerShown: true,
          headerBackTitle: "Back",
          headerTintColor: theme.colors.onSecondary,
          headerStyle: { backgroundColor: theme.colors.primary },
        }}
      />
      <Stack.Screen
        name="OrgSignUp"
        component={OrganizationSignUp}
        options={{
          title: "Organization Sign Up",
          headerShown: true,
          headerBackTitle: "Back",
          headerTintColor: theme.colors.onSecondary,
          headerStyle: { backgroundColor: theme.colors.primary },
        }}
      />
      <Stack.Screen
        name="OrgCreationConfirmation"
        component={OrgCreationConfirmation}
      />
      <Stack.Screen name="ConfirmEmail" component={EmailConfirmationNotice} />
    </Stack.Navigator>
  );
}
