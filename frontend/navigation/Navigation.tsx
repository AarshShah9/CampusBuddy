import { StatusBar } from 'expo-status-bar';
import useThemeContext from '../hooks/useThemeContext';
import { NavigationContainer } from "@react-navigation/native"
import DrawerGroup from './DrawerGroup/DrawerGroup';

export default function Navigation() {
    const { theme } = useThemeContext();
    
    return (
        <NavigationContainer theme={theme}>
            <StatusBar style="auto" />
            <DrawerGroup />
        </NavigationContainer>
    )
}