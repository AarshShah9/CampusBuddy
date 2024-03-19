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

type post = {
  id: string;
  title: string;
  description: string;
  spotsLeft: number;
  expiresAt: Date;
};

export default function Services() {
  const [posts, setPosts] = useState<post[]>([]);
  const { dismissKeyboard } = useAppContext();
  const { getAllPosts } = useEventsContext();

  useEffect(() => {
    getAllPosts().then((res: any) => {
      setPosts(res.data);
    });
  }, []);

  if (posts.length === 0) {
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
            {posts.map((service) => (
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
