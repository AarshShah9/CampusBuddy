import { RefreshControl, View } from "react-native";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";
import { FlashList } from "@shopify/flash-list";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import {
  geOrganizationProfileEvents,
  getUserProfileEvents,
} from "~/lib/apiFunctions/Profile";
import { EventData } from "~/types/Events";
import useLoadingContext from "~/hooks/useLoadingContext";
import useRefreshControl from "~/hooks/useRefreshControl";
import { useCallback, useEffect } from "react";
import useAuthContext from "~/hooks/useAuthContext";

export default function OrganizationEvents() {
  const { organization } = useAuthContext();

  const {
    params: { self, id },
  } = useRoute<any>();

  const {
    data: organizationEvents,
    isLoading,
    refetch,
    isFetchedAfterMount,
    isFetching,
  } = useQuery<EventData[]>({
    queryKey: ["organization-events", id],
    queryFn: () => {
      return geOrganizationProfileEvents(
        self ? organization?.organizationId?.[0]! : id,
      );
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
        data={organizationEvents}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HorizontalScrollElement item={item} isLoading={queryIsLoading} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
        estimatedItemSize={20}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} />
        }
        extraData={queryIsLoading}
      />
    </View>
  );
}
