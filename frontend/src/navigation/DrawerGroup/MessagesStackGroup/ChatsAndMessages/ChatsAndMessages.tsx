import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatListStack from './ChatListStack/ChatListStack';
import ChatScreenStack from './ChatScreenStack/ChatScreenStack';
import { useCallback, useState } from 'react';
import { MessagesNavigationContextProvider } from '~/contexts/messagesNavigationContext';
import { ChatScreenParams } from '~/types/Chat';

const TopTabs = createMaterialTopTabNavigator();

export default function ChatsAndMessages() {
    const [chatActive, setChatActive] = useState<ChatScreenParams | null>(null);
    const activateScreen = useCallback((arg: ChatScreenParams) => {
        setChatActive(arg)
    }, [])
    const deactivateScreen = useCallback(() => {
        setChatActive(null)
    }, [])

    return (
        <MessagesNavigationContextProvider values={{ chatActive, activateScreen, deactivateScreen }}>
            <TopTabs.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
                <TopTabs.Screen name="ChatListStack" component={ChatListStack} />
                {!!chatActive && <TopTabs.Screen name="ChatScreenStack" component={ChatScreenStack} />}
            </TopTabs.Navigator>
        </MessagesNavigationContextProvider>
    )
}