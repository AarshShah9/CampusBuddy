import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header";
import SearchTabs from "./SearchTabs";

const Stack = createNativeStackNavigator();

export default function SearchScreenStack() {
    return (
        <Stack.Navigator screenOptions={{ header: Header }}>
            <Stack.Screen name="SearchTabs" component={SearchTabs} />
        </Stack.Navigator>
    );
}