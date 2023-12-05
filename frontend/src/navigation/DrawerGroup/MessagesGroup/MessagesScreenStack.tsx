import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import useThemeContext from '~/hooks/useThemeContext';
import ChatListStack from './ChatList/ChatListStack';
import ChatScreenGroup from './ChatScreenGroup/ChatScreenGroup';
import { useCallback, useState } from 'react';
import { MessagesNavigationContextProvider } from '~/contexts/messagesNavigationContext';

const TopTabs = createMaterialTopTabNavigator();

export default function MessagesScreenStack() {
    const { theme } = useThemeContext();

    type chatScreenParams = { userId: string, userName: string }
    const [chatActive, setChatActive] = useState<chatScreenParams | null>(null);
    const activateScreen = useCallback((arg: chatScreenParams) => {
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