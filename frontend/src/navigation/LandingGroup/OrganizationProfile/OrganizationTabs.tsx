import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useThemeContext from "~/hooks/useThemeContext";
import OrganizationEvents from "~/screens/OrganizationEvents";
import OrganizationPosts from "~/screens/OrganizationPosts";
import useAuthContext from "~/hooks/useAuthContext";
import OrganizationMarket from "~/screens/OrganizationMarket";
  
const TopTabs = createMaterialTopTabNavigator();
  
export default function OrganizationTabs() {
    const { theme } = useThemeContext();
    const { user } = useAuthContext();

    return (
        <TopTabs.Navigator
            screenOptions={{
                lazy: true,
                tabBarStyle: {
                    backgroundColor: theme.colors.profileTabs,
                    shadowColor: "grey",
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.4,
                    shadowRadius: 3,
                },
                tabBarShowLabel: false,
            }}
        >
            <TopTabs.Screen
                name="OrganizationEvents"
                component={OrganizationEvents}
                initialParams={{ id: user?.id ?? "0" }}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? "calendar-blank" : "calendar-blank-outline"}
                                size={22}
                                color={color}
                            />
                        );
                    },
                }}
            />
            <TopTabs.Screen
                name="OrganizationPosts"
                component={OrganizationPosts}
                initialParams={{ id: user?.id ?? "0" }}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return <FontAwesome name={"binoculars"} size={22} color={color} />;
                    },
                }}
            />
            <TopTabs.Screen
                name="OrganizationMarket"
                component={OrganizationMarket}
                initialParams={{ id: user?.id ?? "0" }}
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return (
                            <MaterialCommunityIcons
                                name={focused ? "shopping" : "shopping-outline"}
                                size={24}
                                color={color}
                            />
                        );
                    },
                }}
            />
        </TopTabs.Navigator>
    );
}  