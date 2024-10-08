import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "~/hooks/useThemeContext";
import MenuIcon from "./MenuIcon";
import useAuthContext from "~/hooks/useAuthContext";
import { generateImageURL } from "~/lib/CDNFunctions";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import useProfileContext from "~/hooks/useProfileContext";

export default function Header() {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const { user } = useAuthContext();
  const { openPictureModal } = useProfileContext();
  const [imageSource, setImageSource] = useState<any>(null);

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
          paddingTop: insets.top + 15,
          backgroundColor: theme.colors.profileTabs,
          borderBottomColor: theme.colors.background,
        },
      ]}
    >
      <View
        style={{
          width: "100%",
          height: user?.degreeName ? 140 : 120,
        }}
      >
        <View style={styles.upperSection}>
          <TouchableOpacity onPress={openPictureModal}>
            <View
              style={[
                styles.profilePicContainer,
                { backgroundColor: theme.colors.profilePicContainer },
              ]}
            >
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
            <Text style={styles.profileInfoItem}>{user?.attended ?? "0"}</Text>
            <Text style={styles.profileInfoItem}>Attended</Text>
          </View>
          <View style={styles.miniInfoContainer}>
            <Text style={styles.profileInfoItem}>{user?.following ?? "0"}</Text>
            <Text style={styles.profileInfoItem}>Following</Text>
          </View>
          <MenuIcon />
        </View>
        <View style={styles.lowerSection}>
          <Text style={{ fontWeight: "bold" }}>
            {user?.firstName} {user?.lastName}
          </Text>
          <Text>{user?.degreeName}</Text>
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
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
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
