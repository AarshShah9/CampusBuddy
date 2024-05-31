import { useRoute } from "@react-navigation/native";
import { View, Image, StyleSheet } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";
import useThemeContext from "~/hooks/useThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { getUserDataApi } from "~/lib/apiFunctions/User";

export default function ChatScreenHeader() {
    const {
        params: { userId },
    } = useRoute<any>();

    const [fetchedData, setFetchedData] = useState<{ userName: string, icon: string | null }>({
        userName: "",
        icon: null,
    });

    const { userName, icon } = fetchedData;

    useEffect(() => {
        getUserDataApi(userId)
            .then(
                (item) =>
                    item && setFetchedData({ userName: item.name, icon: item.icon }),
            )
            .catch((err) => console.log("error occured", err));
    }, [userId]);
    
    const { theme } = useThemeContext();

    return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
                style={styles.iconContainer}
            >
                {icon ?
                    <Image
                        style={{ width: "100%", height: "100%" }}
                        source={{ uri: icon }}
                    />
                    :<MaterialIcons name="person" size={30} color="#333" />
                }
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
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 50,
        overflow: "hidden",
        backgroundColor: "lightgrey",
        justifyContent: "center",
        alignItems: "center"
    }
});
