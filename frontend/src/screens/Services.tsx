import {
  View,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
} from "react-native";
import LookingForItem from "~/components/SearchLookingForBar";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";
import { services } from "~/mockData/ServicesData";
import useEventsContext from "~/hooks/useEventsContext";
import { useEffect, useState } from "react";
import { getAllPosts } from "~/lib/apiFunctions/Events";
import { useQuery } from "@tanstack/react-query";

type post = {
  id: string;
  title: string;
  description: string;
  spotsLeft: number;
  expiresAt: Date;
};

export default function Services() {
  const { dismissKeyboard } = useAppContext();

  const { data: posts } = useQuery({
    queryKey: ["search-page-posts"],
    queryFn: getAllPosts,
    initialData: [],
  });

  if (!Array.isArray(posts)) {
    console.log("WHY IS THIS TURNING NULL - Services");
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView style={{ flex: 1 }}>
        <Pressable style={{ paddingVertical: 20 }}>
          <ThemedText
            style={{ paddingLeft: 20, fontFamily: "Nunito-Bold", fontSize: 24 }}
          >
            Looking For
          </ThemedText>
          <View style={{ paddingHorizontal: 20 }}>
            {posts &&
              posts.map((service) => (
                <LookingForItem
                  key={service.id}
                  title={service.title}
                  description={service.description}
                  requiredMembers={service.spotsLeft}
                />
              ))}
          </View>
        </Pressable>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
