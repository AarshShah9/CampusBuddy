import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChatsAndMessages from './ChatsAndMessages/ChatsAndMessages';

const Stack = createNativeStackNavigator();

export default function MessagesStackGroup() {    
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen  
                name="ChatsAndMessages" 
                component={ChatsAndMessages}
            />
        </Stack.Navigator>
    )
}