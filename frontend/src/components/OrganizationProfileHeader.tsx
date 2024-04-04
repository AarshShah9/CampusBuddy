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
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useCallback, useLayoutEffect, useState } from "react";

export default function Header() {
  // const { params: { id, name, image: uri } } = useRoute<any>();
  const { theme } = useThemeContext();

  const name = "Organization Name (NOT YOURS)";
  const uri =
    "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png";

  const [joined, setJoined] = useState(false);
  const joinOrganization = useCallback(() => {
    Alert.alert(
      "Join Organization",
      "Are you sure you want to join this organization?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => setJoined(true),
        },
      ],
    );
  }, []);

  return (
    <View
      style={[
        styles.headerCard,
        {
          backgroundColor: theme.colors.profileTabs,
          borderBottomColor: theme.colors.background,
        },
      ]}
    >
      <View style={styles.upperSection}>
        <TouchableOpacity
          style={[
            styles.profilePicWrapper,
            { backgroundColor: theme.colors.profilePicContainer },
          ]}
        >
          <View style={styles.profilePicContainer}>
            {uri ? (
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{ uri }}
              />
            ) : (
              <MaterialIcons name="person" size={50} color="grey" />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.miniInfoContainer}>
          {joined ? (
            <>
              <Ionicons
                name="checkmark-circle-outline"
                size={24}
                color="green"
              />
              <Text style={styles.profileInfoItem2}>Joined</Text>
            </>
          ) : (
            <TouchableOpacity
              onPress={joinOrganization}
              style={{ alignItems: "center" }}
            >
              <Ionicons name="add-circle-outline" size={24} color="green" />
              <Text style={styles.profileInfoItem2}>Join</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.miniInfoContainer}>
          <Text style={styles.profileInfoItem1}>167</Text>
          <Text style={styles.profileInfoItem2}>Members</Text>
        </View>
        <View style={styles.miniInfoContainer}></View>
      </View>
      <View style={styles.lowerSection}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>{name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    paddingTop: 20,
    paddingHorizontal: 20,
    height: Dimensions.get("window").height * 0.2,
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
