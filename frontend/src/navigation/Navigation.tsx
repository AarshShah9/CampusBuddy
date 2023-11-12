import useThemeContext from '~/hooks/useThemeContext';
import {NavigationContainer} from "@react-navigation/native"
import {StatusBar} from 'expo-status-bar';
import DrawerGroup from './DrawerGroup/DrawerGroup';
import React from "react";

export default function Navigation() {
    const { theme } = useThemeContext();
    
    return (
        <NavigationContainer theme={theme}>
            <StatusBar style="auto" />
            <DrawerGroup />
        </NavigationContainer>
    )
}