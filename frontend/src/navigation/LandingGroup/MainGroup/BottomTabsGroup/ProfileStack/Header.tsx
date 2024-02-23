import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "~/hooks/useThemeContext";

export default function Header() {
    const insets = useSafeAreaInsets();
    const { theme } = useThemeContext();

    return (
        <View 
            style={[
                styles.headerContainer,
                {
                    paddingTop: insets.top + 35,
                    backgroundColor: theme.colors.onPrimary,
                    borderBottomColor: theme.colors.background
                }
            ]}
        >
            <View style={styles.headerCard}>
                <View style={styles.upperSection}>
                    <View style={styles.profilePicContainer}>
                        <Image
                            style={{ width: "100%", height: "100%" }}
                            source={require("~/assets/images/peterparker.jpg")}
                        />
                    </View>
                    <View style={styles.miniInfoContainer}>
                        <Text style={styles.profileInfoItem}>18</Text>
                        <Text style={styles.profileInfoItem}>Attended</Text>
                    </View>
                    <View style={styles.miniInfoContainer}>
                        <Text style={styles.profileInfoItem}>5</Text>
                        <Text style={styles.profileInfoItem}>Following</Text>
                    </View>
                    <TouchableOpacity style={styles.miniInfoContainer}>
                        <Ionicons name="menu-outline" size={40} color={theme.colors.text} />
                    </TouchableOpacity>
                </View>
                <View style={styles.lowerSection}>
                    <Text style={{ fontWeight: "bold" }}>Peter Parker</Text>
                    <Text>{`Mechanical Engineering`}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        alignItems: "center",
        paddingHorizontal: 25,
        paddingBottom: 0,
        borderBottomWidth: 2
  },
    headerCard: {
        width: "100%",
        height: 150,
    },
    upperSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    profilePicContainer: {
        width: 84,
        height: 84,
        borderRadius: 50,
        overflow: "hidden",
    },
    miniInfoContainer: {
        alignItems: "center",
    },
    profileInfoItem: {
        fontSize: 16,
        fontWeight: "bold",
    },
    lowerSection: {
        marginTop: 10,
    },
});
