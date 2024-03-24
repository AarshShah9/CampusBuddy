import {
  View,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import LookingForItem from "~/components/SearchLookingForBar";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";
import { services } from "~/mockData/ServicesData";
import useEventsContext from "~/hooks/useEventsContext";
import { useCallback, useEffect, useState } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";

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
  const {navigateTo} = useNavigationContext();

  const openLookingForDetails = useCallback((id:string) =>{
    navigateTo({ page: "LookingForDetails", id});
  }, []);

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
              <TouchableOpacity onPress={() => openLookingForDetails(service.id)}>
              <LookingForItem
                key={service.id}
                title={service.title}
                description={service.description}
                requiredMembers={service.spotsLeft}
              />
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
