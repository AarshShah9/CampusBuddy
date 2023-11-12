import {Ionicons} from '@expo/vector-icons';
import {TouchableOpacity} from "react-native";
import useThemeContext from "~/hooks/useThemeContext";
import React from "react";

export default function DrawerIcon ({ navigation }: { navigation: any }) {
    const { theme } = useThemeContext();
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