import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabsGroup from "./BottomTabsGroup";
import ModalScreen from "~/screens/ModalScreen";
import useThemeContext from "~/hooks/useThemeContext";

const Stack = createNativeStackNavigator();

export default function MainGroup() {
    const { theme } = useThemeContext();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="BottomTabsGroup"
                component={BottomTabsGroup}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ModalScreen"
                component={ModalScreen}
                options={{
                    presentation: "modal",
                    headerStyle: { backgroundColor: theme.colors.primary },
                }}
            />
        </Stack.Navigator>
    );
}
