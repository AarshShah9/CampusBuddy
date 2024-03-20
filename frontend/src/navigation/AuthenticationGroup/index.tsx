import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContextProvider } from "~/contexts/authContext";
import EmailConfirmationNotice from "~/screens/EmailConfirmationNotice";
import Login from "~/screens/Login";
import OrgCreationConfirmation from "~/screens/OrgCreationConfirmation";
import OrganizationSignUp from "~/screens/OrganizationScreen";
import StudentSignUp from "~/screens/StudentSignUp";

const Stack = createNativeStackNavigator();

export default function AuthenticationGroup() {
  return (
    <AuthContextProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="StudentSignUp" component={StudentSignUp} />
        <Stack.Screen name="OrgSignUp" component={OrganizationSignUp}/>
        <Stack.Screen name="OrgCreationConfirmation" component={OrgCreationConfirmation}/>
        <Stack.Screen name="ConfirmEmail" component={EmailConfirmationNotice}/>
      </Stack.Navigator>
    </AuthContextProvider>
  );
}
