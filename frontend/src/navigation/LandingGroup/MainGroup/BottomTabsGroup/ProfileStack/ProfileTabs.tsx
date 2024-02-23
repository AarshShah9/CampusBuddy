import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useThemeContext from "~/hooks/useThemeContext";
import ProfileEvents from "~/screens/ProfileEvents";
import ProfilePosts from "~/screens/ProfilePosts";
import ProfileSavedItems from "~/screens/ProfileSavedItems";

const TopTabs = createMaterialTopTabNavigator();

export default function ProfileTabs() {
  const { theme } = useThemeContext();
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: theme.colors.onPrimary },
        tabBarShowLabel: false,
      }}
    >
      <TopTabs.Screen
        name="Events"
        component={ProfileEvents}
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
        name="Posts"
        component={ProfilePosts}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesome name={"binoculars"} size={22} color={color} />;
          },
        }}
      />
      <TopTabs.Screen
        name="Saved"
        component={ProfileSavedItems}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return (
              <Ionicons
                name={focused ? "bookmark" : "bookmark-outline"}
                size={22}
                color={color}
              />
            );
          },
        }}
      />
    </TopTabs.Navigator>
  );
}
