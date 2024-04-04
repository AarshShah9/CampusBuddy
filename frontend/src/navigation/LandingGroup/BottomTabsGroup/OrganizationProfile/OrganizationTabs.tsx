import {
  MaterialCommunityIcons,
  FontAwesome,
  Entypo,
} from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useThemeContext from "~/hooks/useThemeContext";
import OrganizationEvents from "~/screens/OrganizationEvents";
import OrganizationPosts from "~/screens/OrganizationPosts";
import useAuthContext from "~/hooks/useAuthContext";
import OrganizationMarket from "~/screens/OrganizationMarket";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { TouchableOpacity } from "react-native";

const TopTabs = createMaterialTopTabNavigator();

// TODO MAY BE REDUNDANT
export default function OrganizationTabs() {
  const { theme } = useThemeContext();

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
        initialParams={{ self: true }}
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
        initialParams={{ self: true }}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesome name={"binoculars"} size={22} color={color} />;
          },
        }}
      />
      <TopTabs.Screen
        name="OrganizationMarket"
        component={OrganizationMarket}
        initialParams={{ self: true }}
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
