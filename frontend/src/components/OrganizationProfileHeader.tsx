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
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserProfileHeaderType } from "~/types/Profile";
import {
  getOrgProfile,
  getUserProfile,
  joinOrg,
} from "~/lib/apiFunctions/Profile";
import { generateImageURL } from "~/lib/CDNFunctions";
import useAuthContext from "~/hooks/useAuthContext";
import { ThemedText } from "~/components/ThemedComponents";

export type OrganizationProfileHeaderType = {
  organization: {
    members: number;
    name: string;
    image: string;
    member: boolean;
    description: string;
    posts: number;
  };
};

export default function Header() {
  const {
    params: { id },
  } = useRoute<any>();
  const { theme } = useThemeContext();
  const { userType } = useAuthContext();

  const { data: organizationData, refetch } =
    useQuery<OrganizationProfileHeaderType>({
      queryKey: ["org-profile", id],
      queryFn: () => getOrgProfile(id),
      initialData: undefined,
    });

  const joinMutation = useMutation({
    mutationFn: () => joinOrg(id),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("Error", "Failed to join organization");
    },
  });

  const joinOrganization = useCallback(() => {
    const action = organizationData?.organization.member ? "Leave" : "Join";

    Alert.alert(
      `${action} Organization`,
      `Are you sure you want to ${action.toLowerCase()} this organization?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            joinMutation.mutate();
          },
        },
      ],
    );
  }, [organizationData?.organization.member, joinMutation]);

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
            {organizationData?.organization.image ? (
              <Image
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: generateImageURL(organizationData?.organization.image),
                }}
              />
            ) : (
              <MaterialIcons name="person" size={50} color="grey" />
            )}
          </View>
        </TouchableOpacity>
        <View style={styles.miniInfoContainer}>
          <Text style={styles.profileInfoItem1}>
            {organizationData?.organization.posts}
          </Text>
          <Text style={styles.profileInfoItem2}>Events</Text>
        </View>
        <View style={styles.miniInfoContainer}>
          <Text style={styles.profileInfoItem1}>
            {organizationData?.organization.members}
          </Text>
          <Text style={styles.profileInfoItem2}>Members</Text>
        </View>
        {userType === "Organization_Admin" && (
          <View style={styles.miniInfoContainer}></View>
        )}
        {userType === "Student" && (
          <View style={styles.miniInfoContainer}>
            <TouchableOpacity
              onPress={joinOrganization}
              style={{ alignItems: "center" }}
            >
              {organizationData?.organization.member && (
                <>
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={24}
                    color="green"
                  />
                  <Text style={styles.profileInfoItem2}>Joined</Text>
                </>
              )}
              {!organizationData?.organization.member && (
                <>
                  <Ionicons name="add-circle-outline" size={24} color="green" />
                  <Text style={styles.profileInfoItem2}>Join</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View style={styles.lowerSection}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>
          {organizationData?.organization.name}
        </Text>
        <ThemedText
          style={{
            fontSize: 16,
            color: theme.colors.text,
            textAlign: "left",
            justifyContent: "flex-start",
          }}
        >
          {organizationData?.organization.description}
        </ThemedText>
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
  // TODO fix this width changing whens its joined or join
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
