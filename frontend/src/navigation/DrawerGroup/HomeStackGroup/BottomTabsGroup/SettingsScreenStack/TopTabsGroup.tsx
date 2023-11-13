import {Ionicons} from '@expo/vector-icons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GeneralSettings from '~/screens/GeneralSettings';
import NotificationSettings from '~/screens/Notifications';
import useThemeContext from '~/hooks/useThemeContext';

const TopTabs = createMaterialTopTabNavigator();

export default function TopTabsGroup() {
    const { theme } = useThemeContext();
    return (
        <TopTabs.Navigator screenOptions={{ tabBarStyle: { backgroundColor: theme.colors.background }}}>
            <TopTabs.Screen name="General" component={GeneralSettings} />
            <TopTabs.Screen 
                name="Notifications" 
                component={NotificationSettings} 
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return (
                            <Ionicons 
                                name={focused ? "ios-notifications" : "notifications-outline"} 
                                size={24} color={color} 
                            />
                        )
                    }
                }}
            />
        </TopTabs.Navigator>
    )
}