import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BottomTabsGroup from '~/navigation/LandingGroup/BottomTabsGroup';
import MessagesGroup from '~/navigation/LandingGroup/MessagesGroup';

const TopTabs = createMaterialTopTabNavigator();

export default function TopTabsGroup() {
    return (
        <TopTabs.Navigator screenOptions={{ tabBarStyle: { display: 'none' } }}>
            <TopTabs.Screen name="Main" component={BottomTabsGroup} />
            <TopTabs.Screen name="Messages" component={MessagesGroup} />
        </TopTabs.Navigator>
    )
}