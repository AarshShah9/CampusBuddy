import {createNativeStackNavigator} from '@react-navigation/native-stack';
import useThemeContext from '~/hooks/useThemeContext';
import Marketplace from '~/screens/Marketplace';
import DrawerIcon from '../../../DrawerIcon';
import UserIcon from '../../../UserIcon';

const Stack = createNativeStackNavigator();

export default function MarketplaceScreenStack() {
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
                name="MarketplaceScreen" component={Marketplace} 
                options={({ navigation }) => ({ 
                    title: 'Marketplace',
                    headerLeft: () => <DrawerIcon />,
                    headerRight: () => <UserIcon />,
                })}
            />
        </Stack.Navigator>
    )
}