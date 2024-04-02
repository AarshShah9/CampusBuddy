import Header from "./Header";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrganizationTabs from "./OrganizationTabs";

const Stack = createNativeStackNavigator();

export default function OrganizationProfile() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="OrganizationTabs"
                component={OrganizationTabs}
                options={{
                    title: "Profile",
                    header: Header,
                }}
            />
        </Stack.Navigator>
    )
}