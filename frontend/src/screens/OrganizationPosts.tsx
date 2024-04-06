import { Pressable, RefreshControl, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getUserProfilePosts } from "~/lib/apiFunctions/Profile";
import useLoadingContext from "~/hooks/useLoadingContext";
import useRefreshControl from "~/hooks/useRefreshControl";
import { useCallback, useEffect } from "react";
import { FlashList } from "@shopify/flash-list";
import LookingForItem from "~/components/SearchLookingForBar";
import { PostType } from "~/types/LookingFor";

export default function OrganizationPosts() {
  const {
    params: { id },
  } = useRoute<any>();

  const {
    data: organizationPosts,
    isLoading,
    refetch,
    isFetchedAfterMount,
    isFetching,
  } = useQuery<PostType[]>({
    queryKey: ["organization-posts"],
    queryFn: () => {
      return [];
    },
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
    <View style={{ flex: 1 }}>
      <FlashList
        data={organizationPosts}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable>
            <View style={{ paddingHorizontal: 20 }}>
              <LookingForItem
                key={item.id}
                title={item.title}
                description={item.description}
                requiredMembers={item.spotsLeft}
                id={item.id}
              />
            </View>
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        estimatedItemSize={20}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} />
        }
        extraData={queryIsLoading}
        ListHeaderComponent={() => (
          <Text
            style={{
              paddingLeft: 20,
              fontFamily: "Nunito-Bold",
              fontSize: 24,
            }}
          >
            Posts
          </Text>
        )}
        ListEmptyComponent={() => {
          return (
            <>
              {!isLoading && !isFetching && (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ textAlign: "center", marginTop: 150 }}>
                    No posts found.
                  </Text>
                </View>
              )}
            </>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
});
