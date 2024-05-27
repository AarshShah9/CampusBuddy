import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
  TextInput as RNTextInput,
} from "react-native";
import useThemeContext from "~/hooks/useThemeContext";
import CommentsBar from "~/components/CommentsBar";
import { useRoute } from "@react-navigation/native";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  attendPost,
  commentOnPost,
  getLookingForCommentsById,
} from "~/lib/apiFunctions/LookingFor";
import { ThemedText } from "~/components/ThemedComponents";
import { Button, TextInput } from "react-native-paper";

export type commentType = {
  content: string;
  createdAt: string;
  id: string;
  userId: string;
  userImage: string;
  userName: string;
};

function CommentField({ id, refetch }: { id: string; refetch: () => void }) {
  const [text, setText] = React.useState("");
  const inputRef = useRef<RNTextInput>(null);

  const joinPostMutation = useMutation({
    mutationFn: () => commentOnPost(id, text),
    onSuccess: () => {
      setText("");
      refetch();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const submitComment = useCallback(() => {
    joinPostMutation.mutate();
  }, [text]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <View style={styles.addComment}>
      <RNTextInput
        ref={inputRef}
        value={text}
        onChangeText={(text) => setText(text)}
        placeholder={"Add a Comment"}
        style={{
          width: "75%",
          backgroundColor: "white",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "grey",
          marginTop: 10,
          marginBottom: 10,
          padding: 10,
          height: 40,
        }}
      />
      <Button
        mode="contained"
        style={[styles.replyButton, { justifyContent: "center" }]}
        onPress={submitComment}
        disabled={joinPostMutation.isPending || text.length === 0}
      >
        Reply
      </Button>
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
    refetch,
  } = useQuery<commentType[]>({
    queryKey: ["comments", id],
    queryFn: async () => getLookingForCommentsById(id),
    initialData: [],
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1, backgroundColor: theme.colors.tertiary }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 72 : 0}
      >
        <View
          style={[
            styles.mainContainer,
            {
              backgroundColor: theme.colors.onPrimary,
              marginBottom: 40,
            },
          ]}
        >
          <ScrollView
            style={{
              flexGrow: 1,
            }}
          >
            {comments &&
              comments.map((comment, i) => (
                <CommentsBar {...comment} key={i} />
              ))}
            {comments?.length === 0 && !isLoading && !isFetching && (
              <ThemedText style={styles.noCommentsText}>No Comments</ThemedText>
            )}
          </ScrollView>
          <View style={{ height: 40 }}>
            <CommentField id={id} refetch={refetch} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 55,
    borderTopColor: "grey",
    borderTopWidth: 0.2,
  },
  replyButton: {
    height: 40,
    marginTop: 10,
  },
});
