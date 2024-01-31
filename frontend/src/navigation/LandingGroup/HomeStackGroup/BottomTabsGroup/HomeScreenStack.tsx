import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useThemeContext from '~/hooks/useThemeContext';
import Home from '~/screens/Home';
import DrawerIcon from '../../../DrawerIcon';
import UserIcon from '../../../UserIcon';

const Stack = createNativeStackNavigator();

export default function HomeScreenStack() {
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
                name="HomeScreen" component={Home} 
                options={({ navigation }) => ({ 
                    title: 'Home',
                    headerLeft: () => <DrawerIcon />,
                    headerRight: () => <UserIcon />,
                })} 
            />
        </Stack.Navigator>
    )
}