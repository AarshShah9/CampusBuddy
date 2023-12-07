import {createDrawerNavigator} from '@react-navigation/drawer';
import useThemeContext from '~/hooks/useThemeContext';
import HomeStackGroup from './HomeStackGroup/HomeStackGroup';
import MessagesScreenStack from './MessagesGroup/MessagesScreenStack';
import CarpoolScreenStack from './CarpoolScreenStack';
import { MessagesContextProvider } from '~/contexts/messagesContext';

const Drawer = createDrawerNavigator();

export default function DrawerGroup() {
    const { theme } = useThemeContext();

    return (
        <MessagesContextProvider>
            <Drawer.Navigator 
                screenOptions={{ 
                    headerShown: false, 
                    drawerStyle: { backgroundColor: theme.colors.surfaceVariant } 
                }}
            >
                <Drawer.Screen name="Home" component={HomeStackGroup} />
                <Drawer.Screen name="Messages" component={MessagesScreenStack} />
                <Drawer.Screen name="Carpool" component={CarpoolScreenStack} />
            </Drawer.Navigator>
        </MessagesContextProvider>
    )
}