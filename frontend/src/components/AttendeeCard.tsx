import { AttendeeResponse } from "~/types/Events";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useCallback } from "react";
import { generateImageURL } from "~/lib/CDNFunctions";
import { MaterialIcons } from "@expo/vector-icons";
import useNavigationContext from "~/hooks/useNavigationContext";
import useThemeContext from "~/hooks/useThemeContext";

export default function AttendeeCard({
  item,
  type = "User",
  onPress,
}: {
  item: AttendeeResponse;
  type?: "User" | "Organization";
  onPress?: () => void;
}) {
  const { navigateTo } = useNavigationContext();
  const { theme } = useThemeContext();

  const onUserPress = useCallback(() => {
    if (type === "User") {
      onPress?.();
      navigateTo({ page: "UserProfile", id: item.id });
    }
  }, [item.id]);

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.background,
        },
      ]}
      onPress={onUserPress}
    >
      {item.image ? (
        <Image
          source={{ uri: generateImageURL(item.image) }}
          style={styles.profilePic}
        />
      ) : (
        <MaterialIcons name="person" size={50} color="#333" />
      )}
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
  },
  name: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    paddingLeft: 15,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
