import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GeneralSettings from '../../../../../screens/GeneralSettings';
import NotificationSettings from '../../../../../screens/Notifications';

const TopTabs = createMaterialTopTabNavigator();

export default function TopTabsGroup() {
    return (
        <TopTabs.Navigator>
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