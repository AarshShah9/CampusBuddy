import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MainGroup from "./MainGroup";
import MessagesGroup from "./MessagesGroup";
import { Dimensions } from "react-native";

const TopTabs = createMaterialTopTabNavigator();

export default function TopTabsGroup() {
    return (
        <TopTabs.Navigator
            initialLayout={{
                width: Dimensions.get("window").width,
            }}
            screenOptions={{ tabBarStyle: { display: "none" } }}
        >
            <TopTabs.Screen name="Main" component={MainGroup} />
            <TopTabs.Screen name="Messages" component={MessagesGroup} />
        </TopTabs.Navigator>
    );
}
