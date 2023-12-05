import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useThemeContext from '~/hooks/useThemeContext';
import DrawerIcon from '../../../DrawerIcon';
import UserIcon from '../../../UserIcon';
import Messages from '~/screens/Messages';

const Stack = createNativeStackNavigator();

export default function ChatListStack() {
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
                name="MessagesScreen" component={Messages} 
                options={({ navigation }) => ({ 
                    title: 'Messages',
                    headerLeft: () => <DrawerIcon {...{ navigation }} />,
                    headerRight: () => <UserIcon />,
                })}
            />
        </Stack.Navigator>
    )
}