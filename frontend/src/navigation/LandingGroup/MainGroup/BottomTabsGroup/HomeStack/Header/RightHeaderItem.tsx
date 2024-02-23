import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import useThemeContext from "~/hooks/useThemeContext";
import { TouchableOpacity } from "react-native";
import { useCallback } from "react";

export default function RightHeaderItem() {
    const { theme } = useThemeContext();
    const navigation = useNavigation<any>();
    const goToMessages = useCallback(() => {
        navigation.navigate('Messages')
    }, [])

    return (
        <TouchableOpacity onPress={goToMessages}>
            <MaterialCommunityIcons 
                name="chat-outline" 
                size={28} 
                color={theme.colors.onPrimary}
            />
        </TouchableOpacity>
    )
}