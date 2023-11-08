import { createDrawerNavigator } from '@react-navigation/drawer';
import useThemeContext from '../../hooks/useThemeContext';
import HomeStackGroup from './HomeStackGroup/HomeStackGroup';
import CarpoolScreenStack from './CarpoolScreenStack';

const Drawer = createDrawerNavigator();

export default function DrawerGroup() {
    const { theme } = useThemeContext();

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: theme.colors.surfaceVariant } }}>
            <Drawer.Screen name="Home" component={HomeStackGroup} />
            <Drawer.Screen name="Carpool" component={CarpoolScreenStack} />
        </Drawer.Navigator>
    )
}