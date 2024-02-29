import { TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from '@expo/vector-icons'
import useProfileContext from "~/hooks/useProfileContext"
import useThemeContext from "~/hooks/useThemeContext";

export default function MenuIcon() {
    const { theme } = useThemeContext();
    const { openModal } = useProfileContext();

    return (
        <TouchableOpacity style={styles.miniInfoContainer} onPress={openModal}>
            <Ionicons name="menu-outline" size={40} color={theme.colors.text} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    miniInfoContainer: {
        alignItems: "center",
    },
})