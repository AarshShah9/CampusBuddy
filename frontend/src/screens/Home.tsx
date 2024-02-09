import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import { Card } from "react-native-paper";
import { ThemedText } from "~/components/ThemedComponents";
import useLoadingContext from "~/hooks/useLoadingContext";
import { getRequest, uploadImageRequest } from "~/lib/CBRequest";
import { EventCreateSchema } from "../../../shared/zodSchemas";
import { z } from "zod";
import imageGetter from "~/lib/imageGetter";
import Map from "~/screens/Map";
import MapComponentSmall from "~/components/MapComponentSmall";
import useThemeContext from "~/hooks/useThemeContext";

export default function Home() {
  const { startLoading, stopLoading } = useLoadingContext();
  const [image, setImage] = useState<string>();

  const testCallback = async () => {
    await getRequest("/Test", {})
      .then((response) => response)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const { navigate } = useNavigation<any>();

  const pickImage = async () => {
    const result = await imageGetter();

    if (result.canceled) {
      return;
    }

    type EventCreateType = z.infer<typeof EventCreateSchema>;

    const data: EventCreateType = {
      title: "Test Event NEW",
      description: "Test Description",
      location: "Test Location",
      startTime: new Date(2025, 1, 2024, 1),
      endTime: new Date(2025, 1, 2024, 4),
      isPublic: true,
    };
    await uploadImageRequest(
      "post",
      "/api/events/",
      result.assets[0],
      data,
      {},
    );
  };

  const { theme } = useThemeContext();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title={"Test"} onPress={testCallback} />
      <MapComponentSmall latitude={37.78825} longitude={-122.4324} />
      <View style={styles.mockEventsContainer}>
        <Card
          style={[styles.mockEventContainer, { backgroundColor: theme.colors.primary }]}
          mode="elevated"
          onPress={() => {
            navigate("EventDetails", { eventNumber: 1 });
          }}
        >
          <Card.Content style={{ alignItems: "center" }}>
            <ThemedText>Mock Event 1</ThemedText>
          </Card.Content>
        </Card>
        <Card
          style={[styles.mockEventContainer, { backgroundColor: theme.colors.primary }]}
          mode="elevated"
          onPress={() => {
            navigate("EventDetails", { eventNumber: 2 });
          }}
        >
          <Card.Content style={{ alignItems: "center" }}>
            <ThemedText>Mock Event 2</ThemedText>
          </Card.Content>
        </Card>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mockEventsContainer: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    width: "95%",
    height: "auto",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mockEventContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
  },
});
