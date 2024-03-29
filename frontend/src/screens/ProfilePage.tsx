import UserProfileHeader from "~/components/UserProfileHeader";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import ProfileEvents from "~/screens/ProfileEvents";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import ProfilePosts from "~/screens/ProfilePosts";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import useThemeContext from "~/hooks/useThemeContext";

const TopTabs = createMaterialTopTabNavigator();

export default function ProfilePage() {
  const {
    params: { id },
  } = useRoute<any>();
  const { theme } = useThemeContext();

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <UserProfileHeader id={id} />
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
          initialParams={{ id }}
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
              return (
                <FontAwesome name={"binoculars"} size={22} color={color} />
              );
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
      </TopTabs.Navigator>
    </View>
  );
}
