import { Ionicons, MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import { MaterialBottomTabNavigationOptions, createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import useThemeContext from "~/hooks/useThemeContext";
import SearchGroup from "./SearchGroup";
import AddFriendsGroup from "./AddFriendsGroup";
import ProfileGroup from "./ProfileGroup";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import ThreadsGroup from "./ThreadsGroup";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeGroup from "./HomeGroup/";

const BottomTab = createMaterialBottomTabNavigator();

type ScreenOptions = (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
}) => MaterialBottomTabNavigationOptions;

const screenOptions: ScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color, focused }) => {
        let iconName: any;
        if (route.name === "Home") iconName = focused ? "home" : "home-outline";
        else if (route.name === "Search")
            iconName = focused ? "search" : "search-outline";
        else if (route.name === "Add Friends")
            iconName = focused ? "add-circle" : "add-circle-outline";
        else if (route.name === "Threads")
            return (
                <Octicons
                    {...{
                        name: "hash",
                        size: 22,
                        color,
                    }}
                />
            );
        else if (route.name === "Profile")
            iconName = focused ? "person" : "person-outline";
        else if (route.name === "Marketplace")
            return (
                <MaterialCommunityIcons
                    {...{
                        name: focused ? "shopping" : "shopping-outline",
                        size: 24,
                        color,
                    }}
                />
            );
        else if (route.name === "Settings")
            iconName = focused ? "settings" : "ios-settings-sharp";

        return <Ionicons {...{ name: iconName, size: 24, color }} />;
    },
});

export default function BottomTabGroup() {
    const { theme } = useThemeContext();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <BottomTab.Navigator
                    barStyle={{
                        backgroundColor: theme.colors.background,
                        height: 88,
                    }}
                    labeled={false}
                    initialRouteName="Home"
                    screenOptions={screenOptions}
                >
                    <BottomTab.Screen name="Home" component={HomeGroup} />
                    <BottomTab.Screen name="Search" component={SearchGroup} />
                    <BottomTab.Screen name="Add Friends" component={AddFriendsGroup} />
                    <BottomTab.Screen name="Threads" component={ThreadsGroup} />
                    <BottomTab.Screen name="Profile" component={ProfileGroup} />
                </BottomTab.Navigator>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}