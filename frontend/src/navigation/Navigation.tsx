import useThemeContext from '~/hooks/useThemeContext';
import {NavigationContainer} from "@react-navigation/native"
import {StatusBar} from 'expo-status-bar';
import DrawerGroup from './DrawerGroup/DrawerGroup';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '~/screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    const { theme } = useThemeContext();
    
    return (
        <SafeAreaProvider>
            <NavigationContainer theme={theme}>
                <StatusBar style="auto" />
                <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='SplashScreen'>
                    <Stack.Screen name="SplashScreen" component={SplashScreen}/>
                    <Stack.Screen name="DrawerGroup" component={DrawerGroup}/>
                </Stack.Navigator>  
            </NavigationContainer>
        </SafeAreaProvider>
    )
}