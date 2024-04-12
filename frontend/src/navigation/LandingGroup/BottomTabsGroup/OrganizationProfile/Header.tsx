import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import useThemeContext from "~/hooks/useThemeContext";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useAuthContext from "~/hooks/useAuthContext";
import useProfileContext from "~/hooks/useProfileContext";
import { generateImageURL } from "~/lib/CDNFunctions";
import { ThemedText } from "~/components/ThemedComponents";
import { limitTextToMax } from "~/lib/helperFunctions";

export default function Header() {
  const { theme } = useThemeContext();
  const insets = useSafeAreaInsets();
  const { organization } = useAuthContext();
  const { openPictureModal, openModal } = useProfileContext();
  const [imageSource, setImageSource] = useState<any>(null);
  useEffect(() => {
    const imageSource =
      organization && organization?.organizationImage?.length > 0
        ? { uri: generateImageURL(organization?.organizationImage?.[0]) }
        : null;
    setImageSource(imageSource);
  }, [organization]);

  return (
    <View
      style={[
        styles.headerCard,
        {
          paddingTop: insets.top + 15,
          backgroundColor: theme.colors.profileTabs,
          borderBottomColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.upperSection}>
        <TouchableOpacity
          onPress={openPictureModal}
          style={[
            styles.profilePicWrapper,
            { backgroundColor: theme.colors.profilePicContainer },
          ]}
        >
          <View style={styles.profilePicContainer}>
            {imageSource ? (
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: imageSource.uri }}
              />
            ) : (
              <MaterialIcons name="person" size={50} color="grey" />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.miniInfoContainer}>
          <Text style={styles.profileInfoItem1}>{organization?.posts}</Text>
          <Text style={styles.profileInfoItem2}>Events</Text>
        </View>
        <View style={styles.miniInfoContainer}>
          <Text style={styles.profileInfoItem1}>{organization?.members}</Text>
          <Text style={styles.profileInfoItem2}>Members</Text>
        </View>
        <TouchableOpacity style={styles.miniInfoContainer} onPress={openModal}>
          <Ionicons name="menu-outline" size={40} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.lowerSection}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {organization?.organizationName}
        </Text>
        <ThemedText
          style={{
            fontSize: 16,
            color: theme.colors.text,
            textAlign: "left",
            justifyContent: "flex-start",
          }}
        >
          {limitTextToMax(organization?.organizationDescription?.[0] ?? "", 46)}
        </ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: Dimensions.get("window").height * 0.26,
  },
  upperSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  profilePicWrapper: {
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    borderRadius: 50,
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
  profileInfoItem1: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  profileInfoItem2: {
    fontSize: 16,
  },
  lowerSection: {
    marginTop: 10,
  },
});
