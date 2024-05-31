import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "~/hooks/useThemeContext";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { UserProfileHeaderType } from "~/types/Profile";
import { getUserProfile } from "~/lib/apiFunctions/Profile";
import { generateImageURL } from "~/lib/CDNFunctions";
import { useCallback } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";
import useAuthContext from "~/hooks/useAuthContext";

export default function UserProfileHeader({ id }: { id: string }) {
    const { theme } = useThemeContext();

    const { user } = useAuthContext();

    const { data: profileData } = useQuery<UserProfileHeaderType>({
        queryKey: ["profile", id],
        queryFn: () => getUserProfile(id),
        initialData: undefined,
    });
    const { navigateTo } = useNavigationContext();

    const goToMessages = useCallback(() => {
        navigateTo({ page: "ChatScreen", userId: id });
    }, []);

    return (
        <View
            style={[
                styles.headerContainer,
                {
                    paddingTop: 15,
                    backgroundColor: theme.colors.profileTabs,
                    borderBottomColor: theme.colors.background,
                },
            ]}
        >
            <View
                style={{
                    width: "100%",
                    height: profileData?.user.programs?.[0] ? 140 : 120,
                }}
            >
                <View style={styles.upperSection}>
                    <View
                        style={[
                            styles.profilePicContainer,
                            { backgroundColor: theme.colors.profilePicContainer },
                        ]}
                    >
                        {profileData?.user.image ? (
                            <Image
                                style={{ width: "100%", height: "100%" }}
                                source={{ uri: generateImageURL(profileData?.user.image) }}
                            />
                        ) : (
                            <View style={styles.iconContainer}>
                                <MaterialIcons
                                    name="person"
                                    size={50}
                                    color={theme.colors.tertiary}
                                />
                            </View>
                        )}
                    </View>
                    <View style={styles.miniInfoContainer}>
                        <Text style={styles.profileInfoItem}>
                            {profileData?.user.attended ?? "0"}
                        </Text>
                        <Text style={styles.profileInfoItem}>Attended</Text>
                    </View>
                    <View style={styles.miniInfoContainer}>
                        <Text style={styles.profileInfoItem}>
                            {profileData?.user.following ?? "0"}
                        </Text>
                        <Text style={styles.profileInfoItem}>Following</Text>
                    </View>
                    {(id !== user?.id) &&
                        <TouchableOpacity onPress={goToMessages}>
                            <MaterialCommunityIcons
                                name="chat-outline"
                                size={28}
                                color={theme.colors.primary}
                            />
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.lowerSection}>
                    <Text style={{ fontWeight: "bold" }}>{profileData?.user.name}</Text>
                    <Text>{profileData?.user.programs?.[0]}</Text>
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
        borderBottomWidth: 2,
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
        backgroundColor: "#FFF", // Ensure background color for consistency
        justifyContent: "center", // Center vertically inside the circle
        alignItems: "center", // Center horizontally inside the circle
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
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
    },
});
