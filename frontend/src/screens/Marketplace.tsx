import {
  View,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import MarketplaceItem from "~/components/MarketplaceItem";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";
import { useQuery } from "@tanstack/react-query";
import { MarketPlaceCardProps } from "~/types/Events";
import { getMarketPlaceItems } from "~/lib/apiFunctions/Events";
import { generateImageURL } from "~/lib/CDNFunctions";
import useLoadingContext from "~/hooks/useLoadingContext";
import useRefreshControl from "~/hooks/useRefreshControl";
import { useCallback, useEffect } from "react";
import LookingForItem from "~/components/SearchLookingForBar";
import { FlashList } from "@shopify/flash-list";

export default function Marketplace() {
  const { dismissKeyboard } = useAppContext();

  const {
    data: marketplaceItems,
    isLoading,
    refetch,
    isFetchedAfterMount,
    isFetching,
  } = useQuery<MarketPlaceCardProps[]>({
    queryKey: ["search-marketplace-items"],
    queryFn: getMarketPlaceItems,
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
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <FlashList
        style={{ flex: 1 }}
        data={marketplaceItems}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={20}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} />
        }
        numColumns={2}
        extraData={queryIsLoading}
        renderItem={({ item }) => (
          <Pressable>
            <View style={styles.itemsContainer}>
              <MarketplaceItem
                key={item.id}
                id={item.id}
                title={item.title}
                date={""}
                location={item.location}
                price={`$${item.price}`}
                image={generateImageURL(item.image)!}
              />
            </View>
          </Pressable>
        )}
        contentContainerStyle={{ paddingVertical: 20 }}
        ListHeaderComponent={() => (
          <ThemedText
            style={{ paddingLeft: 20, fontFamily: "Nunito-Bold", fontSize: 24 }}
          >
            Marketplace
          </ThemedText>
        )}
      />
    </TouchableWithoutFeedback>
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
