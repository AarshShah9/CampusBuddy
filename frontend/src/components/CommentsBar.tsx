import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import ReplyChip from "./ReplyChip";
import { commentType } from "~/screens/LookingForCommentsScreen";
import { generateImageURL } from "~/lib/CDNFunctions";
import { convertUTCToTimeAndDate } from "~/lib/timeFunctions";

export default function CommentsBar(props: commentType) {
  return (
    <View style={styles.mainContainer}>
      {/* Header Bar */}
      <View style={styles.dataContainer}>
        <View style={styles.headerContainer}>
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
              }}
            >
              {props.userName}
            </Text>
          </View>
          <Text>{convertUTCToTimeAndDate(props.createdAt)}</Text>
        </View>
        {/* Comment Section */}
        <View>
          <Text style={{ fontSize: 16 }}>{props.content}</Text>
        </View>
      </View>
      {/* Up Vote and DownVote Section */}
      <View style={styles.chipStyleContainer}>
        <ReplyChip />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "auto",
    height: 200,
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
