import { createDrawerNavigator } from "@react-navigation/drawer";
import useThemeContext from "~/hooks/useThemeContext";
import HomeStackGroup from "./HomeStackGroup";
import CarpoolScreenStack from "./CarpoolScreenStack";
import MessagesStackGroup from "./MessagesStackGroup";

const Drawer = createDrawerNavigator();

export default function DrawerGroup() {
  const { theme } = useThemeContext();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { backgroundColor: theme.colors.surfaceVariant },
      }}
    >
      <Drawer.Screen name="Home" component={HomeStackGroup} />
      <Drawer.Screen name="Messages" component={MessagesStackGroup} />
      <Drawer.Screen name="Carpool" component={CarpoolScreenStack} />
    </Drawer.Navigator>
  );
}
