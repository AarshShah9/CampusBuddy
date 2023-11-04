import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Pressable, TouchableOpacity } from 'react-native';

import useAppContext from './hooks/useAppContext';

import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from "./screens/homeStack/Home";
import EventDetails from './screens/homeStack/EventDetails';

import Carpool from './screens/drawer/Carpool';

import Marketplace from './screens/bottomTab/Marketplace';

import GeneralSettings from './screens/topTab/GeneralSettings';
import NotificationSettings from './screens/topTab/Notifications';



const DrawerIcon = ({ navigation }: { navigation: any }) => {
    const { inDarkMode } = useAppContext();
    const iconColor = inDarkMode ? 'white' : 'black';

    return (
        <TouchableOpacity 
            style={{ 
                marginLeft: 10, justifyContent: 'center', alignItems: 'center', 
            }}
            onPress={() => navigation.openDrawer()}
        >
            <Ionicons name="menu" size={32} color={iconColor} />
        </TouchableOpacity>
    )
}


const UserIcon = () => {
    const { inDarkMode } = useAppContext();
    const iconColor = inDarkMode ? 'white' : 'black';
    
    return (
        <TouchableOpacity style={{ 
                marginRight: 10, justifyContent: 'center', alignItems: 'center', 
            }}>
            <FontAwesome5 name="user-circle" size={28} color={iconColor} />
        </TouchableOpacity>
    )
}


const TopTabs = createMaterialTopTabNavigator();

function TopTabsGroup() {
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


const BottomTab = createBottomTabNavigator();

function TabGroup() {
    return (
        <BottomTab.Navigator
            screenOptions={({ route, navigation }) => ({
                headerLeft: () => <DrawerIcon {...{ navigation }} />,
                headerRight: () => <UserIcon />, 
                tabBarIcon: ({ color, focused, size}) => {
                    let iconName: any;
                    if(route.name === 'Home')
                        iconName = focused ? "home" : "home-outline"
                    else if(route.name === 'Marketplace')
                        return (
                            <MaterialCommunityIcons 
                                {...{ 
                                    name: focused ? "shopping" : "shopping-outline", 
                                    size, color 
                                }} 
                            />
                        )
                    else if(route.name === 'Settings')
                        iconName = focused ? "settings" : "ios-settings-sharp"

                    return <Ionicons {...{ name: iconName, size, color }} />
                }
            })}
        >
            <BottomTab.Screen name="Home" component={Home} />
            <BottomTab.Screen name="Marketplace" component={Marketplace} />
            <BottomTab.Screen name="Settings" component={TopTabsGroup} />
        </BottomTab.Navigator>
    )
}


const HomeStack = createNativeStackNavigator();

function HomeStackGroup() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen  
                name="TabGroup" 
                component={TabGroup}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen  
                name="EventDetails" 
                component={EventDetails}
                options={{ presentation: 'modal' }}
            />
        </HomeStack.Navigator>
    )
}


const Drawer = createDrawerNavigator();

function DrawerGroup() {
    return (
        <Drawer.Navigator 
            screenOptions={({ navigation }) => ({
                headerShown: false,
                headerLeft: () => <DrawerIcon {...{ navigation }} />,
                headerRight: () => <UserIcon />, 
            })}
        >
            <Drawer.Screen name="Home" component={HomeStackGroup} />
            <Drawer.Screen name="Carpool" component={Carpool} options={{ headerShown: true }} />
        </Drawer.Navigator>
    )
}


export default function Navigation() {
    const { inDarkMode } = useAppContext();

    return (
        <NavigationContainer
            theme={ inDarkMode ? DarkTheme : DefaultTheme}
        >
            <StatusBar style="auto" />
            <DrawerGroup />
        </NavigationContainer>
    )
}