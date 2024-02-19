import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import useLoadingContext from "~/hooks/useLoadingContext";
import { getRequest, uploadImageRequest } from "~/lib/CBRequest";
import { EventCreateSchema } from "../../../shared/zodSchemas";
import { z } from "zod";
import imageGetter from "~/lib/imageGetter";
import VerticalScrollView from "~/components/VerticalScrollView";
import EventHomeCard from "~/components/HomeEventCard";

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

  return (
  <VerticalScrollView />
  );
}

// // prettier-ignore
// const styles = StyleSheet.create({
//     mockEventsContainer: {
//       marginTop: 30,
//       display: "flex",
//       flexDirection: "row",
//       width: "95%",
//       height: "auto",
//       justifyContent: "space-around",
//       alignItems: "center",
//     },
//     mockEventContainer: {
//       width: 100,
//       height: 100,
//       justifyContent: "center",
//     },
// });
