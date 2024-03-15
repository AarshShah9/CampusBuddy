import { useRoute } from "@react-navigation/native";
import { View, Image, StyleSheet } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";
import useThemeContext from "~/hooks/useThemeContext";

export default function ChatScreenHeader() {
    const {
        params: { userName, icon },
    } = useRoute<any>();

    const { theme } = useThemeContext();

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
                style={{ width: 40, height: 40, borderRadius: 50, overflow: "hidden" }}
            >
                <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: icon }}
                />
            </View>
            <ThemedText style={[styles.userName, { color: theme.colors.onSecondary }]}>{userName}</ThemedText>
        </View>
    );
}

const styles = StyleSheet.create({
    userName: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
});
