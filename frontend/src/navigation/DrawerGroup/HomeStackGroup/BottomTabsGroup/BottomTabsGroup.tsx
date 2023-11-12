import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreenStack from './HomeScreenStack';
import MarketplaceScreenStack from './MarketplaceScreenStack';
import SettingsScreenStack from './SettingsScreenStack/SettingsScreenStack';
import React from "react";

const BottomTab = createMaterialBottomTabNavigator();

export default function BottomTabGroup() {
    return (
        <BottomTab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, focused }) => {
                    let iconName: any;
                    if(route.name === 'Home')
                        iconName = focused ? "home" : "home-outline"
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
            <BottomTab.Screen name="Marketplace" component={MarketplaceScreenStack} />
            <BottomTab.Screen name="Settings" component={SettingsScreenStack} />
        </BottomTab.Navigator>
    )
}