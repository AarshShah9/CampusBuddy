import { AttendeeResponse } from "~/types/Events";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { generateImageURL } from "~/lib/CDNFunctions";

export function RenderAttendee({ item }: { item: AttendeeResponse }) {
  const navigation = useNavigation<any>();
  const onUserPress = useCallback(
    (id: string) => {
      navigation.navigate("UserProfile", { id });
    },
    [navigation],
  );

  return (
    <TouchableOpacity style={styles.card} onPress={() => onUserPress(item.id)}>
      <Text style={styles.name}>{item.name}</Text>
      <Image
        source={{ uri: generateImageURL(item.image) }}
        style={styles.profilePic}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 16,
    color: "#333",
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
