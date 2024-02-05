import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreenStack from './HomeStack';
import useThemeContext from '~/hooks/useThemeContext';
import SearchScreenStack from './SearchStack';
import AddFriendsScreenStack from './AddFriendsStack';
import ProfileScreenStack from './ProfileStack';


const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabGroup() {
    const { theme } = useThemeContext();
    return (
        <BottomTab.Navigator
            barStyle={{
                backgroundColor: theme.colors.onPrimary
            }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused }) => {
                    let iconName: any;
                    if(route.name === 'Home')
                        iconName = focused ? "home" : "home-outline"
                    else if(route.name === 'Search')
                        iconName = focused ? "search" : "search-outline"
                    else if(route.name === 'Add Friends')
                        iconName = focused ? "add-circle" : "add-circle-outline"
                    else if(route.name === 'Profile')
                        iconName = focused ? "person" : "person-outline"
                    else if(route.name === 'Marketplace')
                        return (
                            <MaterialCommunityIcons 
                                {...{ 
                                    name: focused ? "shopping" : "shopping-outline", 
                                    size: 24, color 
                                }} 
                            />
                        )
                    else if(route.name === 'Settings')
                        iconName = focused ? "settings" : "ios-settings-sharp"

                    return <Ionicons {...{ name: iconName, size: 24, color }} />
                }
            })}
        >
            <BottomTab.Screen name="Home" component={HomeScreenStack} />
            <BottomTab.Screen name="Search" component={SearchScreenStack} />
            <BottomTab.Screen name="Add Friends" component={AddFriendsScreenStack} />
            <BottomTab.Screen name="Profile" component={ProfileScreenStack} />
        </BottomTab.Navigator>
    )
}