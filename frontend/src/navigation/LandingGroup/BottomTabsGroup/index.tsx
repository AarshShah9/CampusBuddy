import { Entypo, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {
    createMaterialBottomTabNavigator,
    MaterialBottomTabNavigationOptions,
} from "@react-navigation/material-bottom-tabs";
import useThemeContext from "~/hooks/useThemeContext";
import SearchGroup from "./SearchGroup";
import AddFriendsGroup from "./AddFriendsGroup";
import ProfileGroup from "./ProfileGroup";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import MapsGroup from "./MapsGroup";
import HomeGroup from "./HomeGroup/";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

type ScreenOptions = (props: {
    route: RouteProp<ParamListBase, string>;
    navigation: any;
}) => MaterialBottomTabNavigationOptions;

const screenOptions: ScreenOptions = ({ route }) => ({
    tabBarIcon: ({ color, focused }) => {
        let iconName: any;
        if (route.name === "HomeGroup")
            iconName = focused ? "home" : "home-outline";
        else if (route.name === "SearchGroup")
            iconName = focused ? "search" : "search-outline";
        else if (route.name === "CreatePostGroup")
            iconName = focused ? "add-circle" : "add-circle-outline";
        else if (route.name === "MapsGroup")
            return (
                // TODO fix icon
                <Entypo
                    name="map"
                    size={24}
                    {...{
                        color,
                    }}
                />
            );
        else if (route.name === "ProfileGroup")
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

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabsComponent() {
    const { theme } = useThemeContext();
    
    return (
        <BottomTab.Navigator
            barStyle={{
                backgroundColor: theme.colors.background,
                height: 88,
            }}
            labeled={false}
            initialRouteName="Home"
            screenOptions={screenOptions}
        >
            <BottomTab.Screen name="HomeGroup" component={HomeGroup} />
            <BottomTab.Screen name="SearchGroup" component={SearchGroup} />
            <BottomTab.Screen name="CreatePostGroup" component={AddFriendsGroup} />
            <BottomTab.Screen name="MapsGroup" component={MapsGroup} />
            <BottomTab.Screen name="ProfileGroup" component={ProfileGroup} />
        </BottomTab.Navigator>
    )
}

const Stack = createNativeStackNavigator();