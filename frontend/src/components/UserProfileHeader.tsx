import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "~/hooks/useThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";

type UserProfileHeaderProps = {
  name: string;
  attended: number;
  following: number;
  imageSource?: { uri: string };
  programs: string[];
};

export default function UserProfileHeader(props: UserProfileHeaderProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeContext();

  return (
    <View
      style={[
        styles.headerContainer,
        {
          paddingTop: insets.top + 35,
          backgroundColor: theme.colors.profileTabs,
          borderBottomColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.headerCard}>
        <View style={styles.upperSection}>
          <View
            style={[
              styles.profilePicContainer,
              { backgroundColor: theme.colors.profilePicContainer },
            ]}
          >
            {props.imageSource?.uri ? (
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri: props.imageSource.uri }}
              />
            ) : (
              <View style={styles.iconContainer}>
                <MaterialIcons name="person" size={50} color="grey" />
              </View>
            )}
          </View>
          <View style={styles.miniInfoContainer}>
            <Text style={styles.profileInfoItem}>{props?.attended ?? "0"}</Text>
            <Text style={styles.profileInfoItem}>Attended</Text>
          </View>
          <View style={styles.miniInfoContainer}>
            <Text style={styles.profileInfoItem}>
              {props?.following ?? "0"}
            </Text>
            <Text style={styles.profileInfoItem}>Following</Text>
          </View>
        </View>
        <View style={styles.lowerSection}>
          <Text style={{ fontWeight: "bold" }}>{props.name}</Text>
          <Text>{props.programs?.[0]}</Text>
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
