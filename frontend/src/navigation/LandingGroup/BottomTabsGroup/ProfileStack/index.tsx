import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useThemeContext from '~/hooks/useThemeContext';
import Profile from '~/screens/Profile';

const Stack = createNativeStackNavigator();

export default function ProfileScreenStack() {
    const { theme } = useThemeContext();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: theme.colors.onPrimary,
                headerStyle: {
                    backgroundColor: theme.colors.primary
                }
            }}
        >
            <Stack.Screen 
                name="ProfileScreen" component={Profile} 
                options={({ navigation }) => ({ 
                    title: 'Profile',
                    /* headerLeft: () => <DrawerIcon />,
                    headerRight: () => <UserIcon />, */
                })} 
            />
        </Stack.Navigator>
    )
}