import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native";
import useThemeContext from "../hooks/useThemeContext";

export default function DrawerIcon ({ navigation }: { navigation: any }) {
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