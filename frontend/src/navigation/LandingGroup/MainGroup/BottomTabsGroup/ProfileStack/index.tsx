import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header";
import ProfileTabs from "./ProfileTabs";
import { ProfileContextProvider } from "~/contexts/profileContext";
import ProfileSettings from "~/screens/ProfileSettings";

const Stack = createNativeStackNavigator();

export default function ProfileScreenStack() {
    return (
        <ProfileContextProvider>
            <Stack.Navigator screenOptions={{ header: Header }}>
                <Stack.Screen
                    name="ProfileTabs"
                    component={ProfileTabs}
                    options={{ title: "Profile" }}
                />
            </Stack.Navigator>
            <ProfileSettings />
        </ProfileContextProvider>
    );
}