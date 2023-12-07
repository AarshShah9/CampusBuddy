import { createNativeStackNavigator } from '@react-navigation/native-stack';
import useThemeContext from '~/hooks/useThemeContext';
import Chat from '~/screens/Chat';
import ChatHeader from './ChatHeader';

const Stack = createNativeStackNavigator();

export default function ChatScreenStack() {
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
                name="ChatScreen" component={Chat} 
                options={({ navigation, route }) => ({ 
                    title: '',
                    headerLeft: () => <ChatHeader {...{ navigation, route }} />
                })}
            />
        </Stack.Navigator>
    )
}