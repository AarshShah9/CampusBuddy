import { Dimensions, FlatList, RefreshControl, View } from "react-native";
import { useCallback, useEffect } from "react";
import { getProfileSaved } from "~/lib/apiFunctions/Profile";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import useLoadingContext from "~/hooks/useLoadingContext";
import useNavigationContext from "~/hooks/useNavigationContext";
import useRefreshControl from "~/hooks/useRefreshControl";

export default function ProfileSavedItems() {
  const {
    data: savedEvents,
    isLoading,
    refetch,
    isFetchedAfterMount,
    isFetching,
  } = useQuery({
    queryKey: ["profileSaved"],
    queryFn: getProfileSaved,
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
        data={savedEvents}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        estimatedItemSize={20}
        contentContainerStyle={{ paddingTop: 20 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} />
        }
        extraData={queryIsLoading}
        renderItem={({ item }) => (
          <HorizontalScrollElement item={item} isLoading={queryIsLoading} />
        )}
      />
    </View>
  );
}
