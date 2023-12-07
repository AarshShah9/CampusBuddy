import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChatListStack from './ChatList/ChatListStack';
import ChatScreenGroup from './ChatScreenGroup/ChatScreenGroup';
import { useCallback, useState } from 'react';
import { MessagesNavigationContextProvider } from '~/contexts/messagesNavigationContext';
import { ChatScreenParams } from '~/types/Chat';

const TopTabs = createMaterialTopTabNavigator();

export default function MessagesScreenStack() {
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
                <TopTabs.Screen name="ChatList" component={ChatListStack} />
                {!!chatActive && <TopTabs.Screen name="ChatScreenGroup" component={ChatScreenGroup} />}
            </TopTabs.Navigator>
        </MessagesNavigationContextProvider>
    )
}