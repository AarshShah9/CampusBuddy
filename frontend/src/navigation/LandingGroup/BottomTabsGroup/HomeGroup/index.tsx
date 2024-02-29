import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Header from "./Header";
import Home from "~/screens/Home";

const Stack = createNativeStackNavigator();

export default function HomeGroup() {
    return (
        <Stack.Navigator screenOptions={{ header: Header }}>
            <Stack.Screen name="HomeScreen" component={Home} />
        </Stack.Navigator>
    );
}