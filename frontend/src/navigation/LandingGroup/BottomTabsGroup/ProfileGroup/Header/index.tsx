import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "~/hooks/useThemeContext";
import MenuIcon from "./MenuIcon";
import useAuthContext from "~/hooks/useAuthContext";
import { generateImageURL } from "~/lib/CDNFunctions";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import useProfileContext from "~/hooks/useProfileContext";

export default function Header() {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const { user } = useAuthContext();
  const { openPictureModal } = useProfileContext();
  const [imageSource, setImageSource] = React.useState<any>(null);

  useEffect(() => {
    const imageSource = user?.image
      ? { uri: generateImageURL(user.image) }
      : null;
    setImageSource(imageSource);
  }, [user]);

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: insets.top + 35,
          backgroundColor: theme.colors.onSecondary,
          borderBottomColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.headerCard}>
        <View style={styles.upperSection}>
          <TouchableOpacity onPress={openPictureModal}>
            <View style={styles.profilePicContainer}>
              {imageSource ? (
                <Image
                  style={{ width: "100%", height: "100%" }}
                  source={{ uri: imageSource.uri }}
                />
              ) : (
                <View style={styles.iconContainer}>
                  <MaterialIcons name="person" size={50} color="grey" />
                </View>
              )}
            </View>
          </TouchableOpacity>
          <View style={styles.miniInfoContainer}>
            <Text style={styles.profileInfoItem}>18</Text>
            <Text style={styles.profileInfoItem}>Attended</Text>
          </View>
          <View style={styles.miniInfoContainer}>
            <Text style={styles.profileInfoItem}>5</Text>
            <Text style={styles.profileInfoItem}>Following</Text>
          </View>
          <MenuIcon />
        </View>
        <View style={styles.lowerSection}>
          <Text style={{ fontWeight: "bold" }}>
            {user?.firstName} {user?.lastName}
          </Text>
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
    borderBottomWidth: 2,
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
