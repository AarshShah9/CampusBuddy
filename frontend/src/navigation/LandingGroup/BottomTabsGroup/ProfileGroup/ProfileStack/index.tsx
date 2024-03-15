import Header from "./Header";
import ProfileTabs from "./ProfileTabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ header: Header }}>
            <Stack.Screen
                name="ProfileTabs"
                component={ProfileTabs}
                options={{ title: "Profile" }}
            />
        </Stack.Navigator>
    )
}