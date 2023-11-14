import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useThemeContext from '~/hooks/useThemeContext';
import TopTabsGroup from './TopTabsGroup';
import DrawerIcon from '../../../../DrawerIcon';
import UserIcon from '../../../../UserIcon';

const Stack = createNativeStackNavigator();

export default function SettingsScreenStack() {
    const { theme } = useThemeContext();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: theme.colors.onSurfaceVariant,
                headerStyle: {
                    backgroundColor: theme.colors.surfaceVariant
                }
            }}
        >
            <Stack.Screen 
                name="SettingsScreen" component={TopTabsGroup} 
                options={({ navigation }) => ({ 
                    title: 'Settings',
                    headerLeft: () => <DrawerIcon {...{ navigation }} />,
                    headerRight: () => <UserIcon />,
                })}
            />
        </Stack.Navigator>
    )
}