import { View, StyleSheet, Image } from "react-native";
import { Text } from "react-native-paper";
import ReplyChip from "./ReplyChip";

export default function CommentsBar() {
  return (
    <View style={styles.mainContainer}>
      {/* Header Bar */}
      <View style={styles.dataContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.profileContainer}>
            {/* Profile Pic */}
            <Image
              style={{
                height: 30,
                width: 30,
                backgroundColor: "red",
                borderRadius: 90,
                marginBottom: 5,
              }}
              source={{ uri: "https://picsum.photos/700" }}
            />
            <Text
              style={{
                marginLeft: 8,
              }}
            >
              Username
            </Text>
          </View>
          <Text>Date Posted</Text>
        </View>
        {/* Comment Section */}
        <View>
          <Text style={{ fontFamily: "Roboto", fontSize: 16 }}>
            Comment will go here
          </Text>
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
      paddingBottom: 24
    },
  });
  
