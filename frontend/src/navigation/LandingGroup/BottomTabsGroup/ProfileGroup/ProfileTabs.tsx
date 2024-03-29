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
import useAuthContext from "~/hooks/useAuthContext";

const TopTabs = createMaterialTopTabNavigator();

export default function ProfileTabs() {
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
        name="Events"
        component={ProfileEvents}
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
        name="Posts"
        component={ProfilePosts}
        options={{
          tabBarIcon: ({ color, focused }) => {
            return <FontAwesome name={"binoculars"} size={22} color={color} />;
          },
        }}
      />
      <TopTabs.Screen
        name="Market"
        component={ProfilePosts}
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
