import useThemeContext from '~/hooks/useThemeContext';
import {NavigationContainer} from "@react-navigation/native"
import {StatusBar} from 'expo-status-bar';
import DrawerGroup from './DrawerGroup/DrawerGroup';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function Navigation() {
    const { theme } = useThemeContext();
    
    return (
        <SafeAreaProvider>
            <NavigationContainer theme={theme}>
                <StatusBar style="auto" />
                <DrawerGroup />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}