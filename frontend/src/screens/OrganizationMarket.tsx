import { useQuery } from "@tanstack/react-query";
import { MarketPlaceCardProps } from "~/types/MarketPlaceItem";
import useLoadingContext from "~/hooks/useLoadingContext";
import useRefreshControl from "~/hooks/useRefreshControl";
import { useCallback, useEffect } from "react";
import {
  Pressable,
  RefreshControl,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Text } from "react-native-paper";
import useAppContext from "~/hooks/useAppContext";
import { FlashList } from "@shopify/flash-list";
import MarketplaceItem from "~/components/MarketplaceItem";
import { generateImageURL } from "~/lib/CDNFunctions";
import { useRoute } from "@react-navigation/native";
import { getUserProfileItems } from "~/lib/apiFunctions/Profile";

export default function OrganizationMarket() {
  const { dismissKeyboard } = useAppContext();
  const {
    params: { id },
  } = useRoute<any>();

  const {
    data: marketplaceItems,
    isLoading,
    refetch,
    isFetchedAfterMount,
    isFetching,
  } = useQuery<MarketPlaceCardProps[]>({
    queryKey: ["organization-market"],
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
    <TouchableWithoutFeedback onPress={dismissKeyboard} style={{ flex: 1 }}>
      <FlashList
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
          <Text
            style={{ paddingLeft: 20, fontFamily: "Nunito-Bold", fontSize: 24 }}
          >
            Listings
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
                    No listings currently present
                  </Text>
                </View>
              )}
            </>
          );
        }}
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
