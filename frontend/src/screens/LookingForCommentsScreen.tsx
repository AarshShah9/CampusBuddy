import React from "react";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import useThemeContext from "~/hooks/useThemeContext";
import CommentsBar from "~/components/CommentsBar";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getLookingForCommentsById } from "~/lib/apiFunctions/LookingFor";
import { ThemedText } from "~/components/ThemedComponents";
import { TextInput } from "react-native-paper";

export type commentType = {
  content: string;
  createdAt: string;
  id: string;
  userId: string;
  userImage: string;
  userName: string;
};
function CommentField(){
  const [text, setText] = React.useState("");
  return(
    <View style = {styles.addComment}>
        <TextInput
          label="Add a Comment"
          mode="outlined"
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
  );
}

export default function LookingForCommentsScreen() {
  const { theme, inDarkMode } = useThemeContext();

  let {
    params: { id },
  } = useRoute<any>();

  const {
    data: comments,
    isLoading,
    isFetching,
  } = useQuery<commentType[]>({
    queryKey: ["comments", id],
    queryFn: async () => getLookingForCommentsById(id),
    initialData: [],
  });

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.colors.onPrimary }, // Color incorrect for dark mode
      ]}
    >
      <View>
        {comments &&
          comments.map((comment, i) => <CommentsBar {...comment} key={i} />)}
        {comments?.length === 0 && !isLoading && !isFetching && (
          <ThemedText style={styles.noCommentsText}>No Comments</ThemedText>
        )}
      </View>
      <CommentField />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
    justifyContent:"space-between",
  },
  headerContainer: {
    width: "100%",
    height: 88,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  noCommentsText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 45,
  },
  addComment: {
    flexDirection:"column",
    paddingHorizontal: 16,
    paddingTop: 8,
    marginBottom:32,
    borderTopWidth: 1,
  },
});
