import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useThemeContext from "~/hooks/useThemeContext";
import Events from "~/screens/Events";
import Marketplace from "~/screens/Marketplace";
import Services from "~/screens/Services";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native";

type BarIconProps = {
  focused: boolean;
  color: string;
};

const EventsBarIcon = ({ color, focused }: BarIconProps) => {
  return (
    <MaterialCommunityIcons
      name={focused ? "calendar-blank" : "calendar-blank-outline"}
      size={22}
      color={color}
    />
  );
};

const ServicesBarIcon = ({ color }: BarIconProps) => {
  return <FontAwesome name={"binoculars"} size={22} color={color} />;
};

const MarketplaceBarIcon = ({ color, focused }: BarIconProps) => {
  return (
    <MaterialCommunityIcons
      name={focused ? "shopping" : "shopping-outline"}
      size={22}
      color={color}
    />
  );
};

const TopTabs = createMaterialTopTabNavigator();

export default function SearchTabs() {
  const { theme } = useThemeContext();
  return (
    <TopTabs.Navigator
      tabBarPosition="top"
      screenOptions={{
        lazy: true,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          shadowColor: "grey",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.4,
          shadowRadius: 3,
        },
      }}
    >
      <TopTabs.Screen
        name="Events"
        component={Events}
        options={{ tabBarIcon: EventsBarIcon, tabBarLabel: () => null }}
      />
      <TopTabs.Screen
        name="Looking For"
        component={Services}
        options={{ tabBarIcon: ServicesBarIcon, tabBarLabel: () => null }}
      />
      <TopTabs.Screen
        name="Market"
        component={Marketplace}
        options={{ tabBarIcon: MarketplaceBarIcon, tabBarLabel: () => null }}
      />
    </TopTabs.Navigator>
  );
}
