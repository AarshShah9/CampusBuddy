import {
  View,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  RefreshControl,
} from "react-native";
import LookingForItem from "~/components/SearchLookingForBar";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";
import { services } from "~/mockData/ServicesData";
import useEventsContext from "~/hooks/useEventsContext";
import { useCallback, useEffect, useState } from "react";
import { getAllPosts } from "~/lib/apiFunctions/Events";
import { useQuery } from "@tanstack/react-query";
import { FlashList } from "@shopify/flash-list";
import EventMainCard from "~/components/EventMainCard";
import { convertUTCToTimeAndDate } from "~/lib/timeFunctions";
import useLoadingContext from "~/hooks/useLoadingContext";
import useRefreshControl from "~/hooks/useRefreshControl";

type post = {
  id: string;
  title: string;
  description: string;
  spotsLeft?: number;
  expiresAt: string;
};

export default function Services() {
  const { dismissKeyboard } = useAppContext();

  const {
    data: posts,
    isLoading,
    refetch,
    isFetchedAfterMount,
    isFetching,
  } = useQuery<post[]>({
    queryKey: ["search-page-posts"],
    queryFn: getAllPosts,
    initialData: [],
  });

  const { startLoading, stopLoading } = useLoadingContext();

  const { refreshing, triggerRefresh, stopRefresh } = useRefreshControl();

  const onPullRefresh = useCallback(() => {
    triggerRefresh(() => {
      refetch();
    });
  }, []);

  useEffect(() => {
    if (isLoading) startLoading();
    else stopLoading();
  }, [isLoading]);

  const queryIsLoading = isFetching && isFetchedAfterMount;
  useEffect(() => {
    if (!queryIsLoading) stopRefresh();
  }, [queryIsLoading]);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} style={{ flex: 1 }}>
      <FlashList
        data={posts}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={20}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} />
        }
        extraData={queryIsLoading}
        renderItem={({ item }) => (
          <Pressable>
            <View style={{ paddingHorizontal: 20 }}>
              <LookingForItem
                key={item.id}
                title={item.title}
                description={item.description}
                requiredMembers={item.spotsLeft}
              />
            </View>
          </Pressable>
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
        ListHeaderComponent={() => (
          <ThemedText
            style={{ paddingLeft: 20, fontFamily: "Nunito-Bold", fontSize: 24 }}
          >
            Looking For
          </ThemedText>
        )}
      />
    </TouchableWithoutFeedback>
  );
}
