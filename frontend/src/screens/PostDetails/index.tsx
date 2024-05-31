import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import useThemeContext from "~/hooks/useThemeContext";
import PersonChip from "~/components/PersonChip";
import CommentsChip from "~/components/CommentsChip";
import {
  NavigationProp,
  ParamListBase,
  useRoute,
} from "@react-navigation/native";
import { convertUTCToTimeAndDate } from "~/lib/timeFunctions";
import { generateImageURL } from "~/lib/CDNFunctions";
import React, { useCallback, useLayoutEffect } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";
import { Entypo } from "@expo/vector-icons";
import usePostDetails from "~/hooks/usePostDetails";
import Settings from "./Settings";

export default function LookingForDetails({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const { theme } = useThemeContext();

  const {
    params: { id },
  } = useRoute<any>();

  const {
    bottomSheetModalRef,
    deleteHandler,
    lookingForData,
    openModal,
    joinPostMutation,
  } = usePostDetails(id);

  const { navigateTo } = useNavigationContext();

  const handleClickCommentSection = useCallback(() => {
    navigateTo({ page: "LookingForCommentsScreen", id });
  }, [navigateTo, id]);

  const onUserPress = useCallback(() => {
    navigateTo({ page: "UserProfile", id: lookingForData?.userId ?? "" });
  }, [lookingForData?.userId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openModal}>
          <Entypo name="dots-three-horizontal" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, id, lookingForData?.self]);

  const joinPost = useCallback(() => {
    Alert.alert("Join Post", "Are you sure you want to join this post?", [
      {
        text: "Join",
        onPress: () => joinPostMutation(),
      },
      {
        text: "Cancel",
        style: "cancel",
      },
    ]);
  }, []);

  if (lookingForData && lookingForData.isFlagged) {
    Alert.alert(
      "Under Review",
      "This item has been flagged as it may not meet our guidelines. Please contact us if you have any questions.",
    );
  }

  // Only show the button if the user is not the author of the post and (there are spots left or the user is attending)
  const showButton =
    !lookingForData?.self &&
    ((lookingForData?.spotsLeft && lookingForData?.spotsLeft > 0) ||
      lookingForData?.isAttending != null);

  return (
    <>
      <View
        style={[
          styles.mainContainer,
          { backgroundColor: theme.colors.onPrimary }, // Color incorrect for dark mode
        ]}
      >
        {/* This is the header container */}
        <View style={[{ backgroundColor: theme.colors.onPrimary }]}>
          {/* Here will go the View for the title  */}
          <View style={styles.titleContainer}>
            <View style={styles.profileContainer}>
              <Text
                style={{
                  fontSize: 16,
                  marginBottom: 4,
                  // TODO Need to add Text Color Change
                }}
              >
                {lookingForData?.title}
              </Text>
              <TouchableOpacity onPress={onUserPress}>
                <View style={styles.userContainer}>
                  {lookingForData?.userImage && (
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        backgroundColor: "grey",
                        borderRadius: 90,
                        marginBottom: 5,
                      }}
                      source={{
                        uri: generateImageURL(lookingForData?.userImage),
                      }}
                    />
                  )}
                  <Text
                    style={{
                      marginLeft: 8,
                    }}
                  >
                    {lookingForData?.userName}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                fontSize: 12,
                marginBottom: 8,
              }}
            >
              {convertUTCToTimeAndDate(lookingForData?.createdAt)}
            </Text>
          </View>

          {/* looking for description  Section */}
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text
                style={{
                  marginBottom: 8,
                  fontSize: 16,
                }}
              >
                {lookingForData?.description}
              </Text>
            </View>

            {/* Attending and comments Chip */}
            <View style={styles.chipContainer}>
              {lookingForData?.spotsLeft ? (
                <PersonChip numberOfUsers={lookingForData?.spotsLeft} />
              ) : (
                <View />
              )}
              <TouchableOpacity onPress={handleClickCommentSection}>
                <CommentsChip />
              </TouchableOpacity>
            </View>
            {/* Join Button */}
          </View>
          {showButton && (
            <TouchableOpacity style={styles.buttonContainer} onPress={joinPost}>
              <Button style={styles.joinButton} mode="contained">
                {lookingForData?.isAttending ? "Leave" : "Join"}
              </Button>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Settings
        bottomSheetModalRef={bottomSheetModalRef}
        self={!!lookingForData?.self}
        deleteHandler={deleteHandler}
      />
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
  },
  headerContainer: {
    width: "100%",
    height: 88,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  titleContainer: {
    margin: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  profileContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  contentContainer: {
    marginLeft: 16,
    marginRight: 16,
  },
  textContainer: {},
  chipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
  },
  joinButton: {
    marginVertical: 16,
  },
  buttonContainer: {
    width: "90%",
    alignSelf: "center",
    marginVertical: 16,
  },
});
