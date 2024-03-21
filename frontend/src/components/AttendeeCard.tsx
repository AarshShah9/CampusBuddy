import { AttendeeResponse } from "~/types/Events";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import { generateImageURL } from "~/lib/CDNFunctions";
import { MaterialIcons } from "@expo/vector-icons";

export function RenderAttendee({ item }: { item: AttendeeResponse }) {
  const navigation = useNavigation<any>();
  const onUserPress = useCallback(
    (id: string) => {
      navigation.navigate("UserProfile", { id });
    },
    [navigation],
  );
  const imageSource = item.image ? { uri: generateImageURL(item.image) } : null;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onUserPress(item.id)}>
      {imageSource ? (
        <Image source={imageSource} style={styles.profilePic} />
      ) : (
        <MaterialIcons name="person" size={50} color="#333" />
      )}
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    paddingLeft: 15,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
