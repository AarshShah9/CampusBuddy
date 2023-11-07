import { Ionicons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Pressable, TouchableOpacity } from 'react-native';

import useThemeContext from './hooks/useThemeContext';

import { NavigationContainer } from "@react-navigation/native"
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Home from "./screens/bottomTab/homeStack/Home";
import EventDetails from './screens/bottomTab/homeStack/EventDetails';

import Carpool from './screens/drawer/Carpool';

import Marketplace from './screens/bottomTab/Marketplace';

import GeneralSettings from './screens/bottomTab/topTab/GeneralSettings';
import NotificationSettings from './screens/bottomTab/topTab/Notifications';


const DrawerIcon = ({ navigation }: { navigation: any }) => {
    const { theme } = useThemeContext();
    //const iconColor = inDarkMode ? 'white' : 'black';

    return (
        <TouchableOpacity 
            style={{ 
                justifyContent: 'center', alignItems: 'center', 
            }}
            onPress={() => navigation.openDrawer()}
        >
            <Ionicons name="menu" size={32} color={theme.colors.onSurfaceVariant} />
        </TouchableOpacity>
    )
}

const UserIcon = () => {
    const { theme } = useThemeContext();
    //const iconColor = inDarkMode ? 'white' : 'black';
    
    return (
        <TouchableOpacity 
            style={{ 
                justifyContent: 'center', alignItems: 'center', 
            }}
        >
            <FontAwesome5 name="user-circle" size={28} color={theme.colors.onSurfaceVariant} />
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

const Stack = createNativeStackNavigator();

function HomeScreenStack() {
    const { theme } = useThemeContext();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: theme.colors.onSurfaceVariant,
                headerStyle: {
                    backgroundColor: theme.colors.surfaceVariant
                }
            }}
        >
            <Stack.Screen 
                name="HomeScreen" component={Home} 
                options={({ navigation }) => ({ 
                    title: 'Home',
                    headerLeft: () => <DrawerIcon {...{ navigation }} />,
                    headerRight: () => <UserIcon />,
                })} 
            />
        </Stack.Navigator>
    )
}
function MarketplaceScreenStack() {
    const { theme } = useThemeContext();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: theme.colors.onSurfaceVariant,
                headerStyle: {
                    backgroundColor: theme.colors.surfaceVariant
                }
            }}
        >
            <Stack.Screen 
                name="MarketplaceScreen" component={Marketplace} 
                options={({ navigation }) => ({ 
                    title: 'Marketplace',
                    headerLeft: () => <DrawerIcon {...{ navigation }} />,
                    headerRight: () => <UserIcon />,
                })}
            />
        </Stack.Navigator>
    )
}
function SettingsScreenStack() {
    const { theme } = useThemeContext();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: theme.colors.onSurfaceVariant,
                headerStyle: {
                    backgroundColor: theme.colors.surfaceVariant
                }
            }}
        >
            <Stack.Screen 
                name="SettingsScreen" component={TopTabsGroup} 
                options={({ navigation }) => ({ 
                    title: 'Settings',
                    headerLeft: () => <DrawerIcon {...{ navigation }} />,
                    headerRight: () => <UserIcon />,
                })}
            />
        </Stack.Navigator>
    )
}

//const BottomTab = createBottomTabNavigator();
const BottomTab = createMaterialBottomTabNavigator();

function BottomTabGroup() {
    return (
        <BottomTab.Navigator
            screenOptions={({ route, navigation }) => ({
                
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

function HomeStackGroup() {
    return (
        <Stack.Navigator>
            <Stack.Screen  
                name="BottomTabGroup" 
                component={BottomTabGroup}
                options={{ headerShown: false }}
            />
            <Stack.Screen  
                name="EventDetails" 
                component={EventDetails}
                options={{ presentation: 'modal' }}
            />
        </Stack.Navigator>
    )
}


function CarpoolScreenStack() {
    const { theme } = useThemeContext();
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: theme.colors.onSurfaceVariant,
                headerStyle: {
                    backgroundColor: theme.colors.surfaceVariant
                }
            }}
        >
            <Stack.Screen 
                name="CarpoolScreen" component={Carpool} 
                options={({ navigation }) => ({ 
                    title: 'Carpool',
                    headerLeft: () => <DrawerIcon {...{ navigation }} />,
                    headerRight: () => <UserIcon />,
                })}
            />
        </Stack.Navigator>
    )
}

const Drawer = createDrawerNavigator();

function DrawerGroup() {
    const { theme } = useThemeContext();

    return (
        <Drawer.Navigator screenOptions={{ headerShown: false, drawerStyle: { backgroundColor: theme.colors.surfaceVariant } }}>
            <Drawer.Screen name="Home" component={HomeStackGroup} />
            <Drawer.Screen name="Carpool" component={CarpoolScreenStack} />
        </Drawer.Navigator>
    )
}


export default function Navigation() {
    const { theme } = useThemeContext();
    
    return (
        <NavigationContainer theme={theme}>
            <StatusBar style="auto" />
            <DrawerGroup />
        </NavigationContainer>
    )
}