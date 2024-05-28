import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import ReplyChip from "./ReplyChip";
import { commentType } from "~/screens/LookingForCommentsScreen";
import { generateImageURL } from "~/lib/CDNFunctions";
import { convertUTCToTimeAndDate } from "~/lib/timeFunctions";
import useNavigationContext from "~/hooks/useNavigationContext";

export default function CommentsBar(props: commentType) {
  // 6 different heights for comment card
  let heightCommentCard = 0;
  if (props.content.length < 50) {
    heightCommentCard = 100;
  } else if (props.content.length < 100) {
    heightCommentCard = 120;
  } else if (props.content.length < 150) {
    heightCommentCard = 140;
  } else if (props.content.length < 200) {
    heightCommentCard = 160;
  } else if (props.content.length < 250) {
    heightCommentCard = 180;
  } else {
    heightCommentCard = 200;
  }

  const { navigateTo } = useNavigationContext();

  const navigateToProfile = () => {
    navigateTo({ page: "UserProfile", id: props.userId });
  };

  return (
    <View
      style={[
        styles.mainContainer,
        {
          height: heightCommentCard,
        },
      ]}
    >
      {/* Header Bar */}
      <View style={styles.dataContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={navigateToProfile}>
            <View style={styles.profileContainer}>
              {/* Profile Pic */}
              {props?.userImage && (
                <Image
                  style={{
                    height: 30,
                    width: 30,
                    backgroundColor: "grey",
                    borderRadius: 90,
                    marginBottom: 5,
                  }}
                  source={{ uri: generateImageURL(props.userImage) }}
                />
              )}
              <Text
                style={{
                  marginLeft: 8,
                  fontWeight: "500",
                }}
              >
                {props.userName}
              </Text>
            </View>
          </TouchableOpacity>
          <Text>{convertUTCToTimeAndDate(props.createdAt)}</Text>
        </View>
        {/* Comment Section */}
        <View>
          <Text style={{ fontSize: 16 }}>{props.content}</Text>
        </View>
      </View>
      {/* Up Vote and DownVote Section */}
      {/*<View style={styles.chipStyleContainer}>*/}
      {/*  <ReplyChip />*/}
      {/*</View>*/}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "auto",
    paddingHorizontal: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dataContainer: {
    flexDirection: "column",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 16,
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chipStyleContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: "auto",
    paddingBottom: 24,
  },
});
