import {
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
  RefreshControl,
} from "react-native";
import EventMainCard from "~/components/EventMainCard";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";
import { convertUTCToTimeAndDate } from "~/lib/timeFunctions";
import { useQuery } from "@tanstack/react-query";
import { getSearchPageEvents } from "~/lib/apiFunctions/Events";
import { SearchPageEventType } from "~/types/Events";
import { FlashList } from "@shopify/flash-list";
import useLoadingContext from "~/hooks/useLoadingContext";
import useRefreshControl from "~/hooks/useRefreshControl";
import { useCallback, useEffect } from "react";

export default function Events() {
  const { dismissKeyboard } = useAppContext();

  let {
    data: searchPageEvents,
    isLoading,
    refetch,
    isFetchedAfterMount,
    isFetching,
  } = useQuery<SearchPageEventType[]>({
    queryKey: ["search-page-events"],
    queryFn: getSearchPageEvents,
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
        data={searchPageEvents}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={20}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} />
        }
        extraData={queryIsLoading}
        renderItem={({ item }) => (
          <Pressable>
            <View style={{ paddingHorizontal: 20 }}>
              <EventMainCard
                key={item.id}
                id={item.id}
                title={item.title}
                date={convertUTCToTimeAndDate(item.startTime)}
                location={item.location.name}
                clubName={item.organization?.organizationName}
                image={item.image}
              />
            </View>
          </Pressable>
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
        ListHeaderComponent={() => (
          <ThemedText
            style={{
              paddingLeft: 20,
              fontFamily: "Nunito-Bold",
              fontSize: 24,
            }}
          >
            Events
          </ThemedText>
        )}
      />
    </TouchableWithoutFeedback>
  );
}
