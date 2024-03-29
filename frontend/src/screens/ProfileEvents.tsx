import {
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "~/components/ThemedComponents";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";
import Carousel from "pinar";
import { generateImageURL } from "~/lib/CDNFunctions";
import { FlashList } from "@shopify/flash-list";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getUserProfileEvents } from "~/lib/apiFunctions/Profile";
import { EventData } from "~/types/Events";
import useLoadingContext from "~/hooks/useLoadingContext";
import useRefreshControl from "~/hooks/useRefreshControl";
import { useCallback, useEffect } from "react";

export default function ProfileEvents() {
  const {
    params: { id },
  } = useRoute<any>();

  const {
    data: userProfileEvents,
    isLoading,
    refetch,
    isFetchedAfterMount,
    isFetching,
  } = useQuery<EventData[]>({
    queryKey: ["user-events", id],
    queryFn: () => getUserProfileEvents(id),
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
        data={userProfileEvents}
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

// const events = [
//   {
//     title: "Attending",
//     id: "1",
//     items: [
//       {
//         id: "1",
//         title: "Crowchild Classic",
//         time: "Jan 27",
//         location: "Saddledome",
//         image: "https://d2epenzoyf672m.cloudfront.net/pfp/hockeyAd.jpg",
//       },
//     ],
//   },
//   {
//     title: "Past Events",
//     id: "2",
//     items: [
//       {
//         id: "2",
//         title: "Weekly Bouldering",
//         time: "Jan 4",
//         location: "UofC Kines Block",
//         image: "https://d2epenzoyf672m.cloudfront.net/pfp/bouldering.jpg",
//         event: true,
//       },
//       {
//         id: "3",
//         title: "Volleyball Tournament",
//         time: "Jan 14",
//         location: "UofC Kines Block",
//         image:
//             "https://d2epenzoyf672m.cloudfront.net/pfp/basketball_tournament.jpg",
//         event: true,
//       },
//       {
//         id: "4",
//         title: "Networking Night",
//         time: "Jan 15",
//         location: "MacHall",
//         image: "https://d2epenzoyf672m.cloudfront.net/pfp/networkingWeb.png",
//         event: true,
//       },
//     ],
//   },
// ];
