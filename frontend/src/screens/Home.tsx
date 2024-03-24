import { RefreshControl, View, Image, Dimensions, TouchableOpacity } from "react-native";
import { FlashList } from "@shopify/flash-list";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";
import Carousel from "pinar";
import { useCallback, useEffect } from "react";
import useLoadingContext from "~/hooks/useLoadingContext";
import { useQuery } from "@tanstack/react-query";
import { generateImageURL } from "~/lib/CDNFunctions";
import useNavigationContext from "~/hooks/useNavigationContext";
import usePushNotifications from "~/hooks/usePushNotifications";
import useRefreshControl from "~/hooks/useRefreshControl";
import { getMainEvents } from "~/lib/apiFunctions/Events";
import HomeSkeleton from "./HomeSkeleton";
import { EventData, EventType } from "~/types/Events";

const fetchMainEvents = async (): Promise<{ allEvents: EventData[], startingEvents: EventType[] }> => {
    try {
        const { data: { allEvents, startingEvents } } = await getMainEvents()
        return { allEvents, startingEvents }
    } catch (error) {
        console.error('An error occured while fetching main events:\n', error)
        return { allEvents: [], startingEvents: [] }
    }
}

export default function Home() {
    const { expoPushToken, sendNotification } = usePushNotifications();

    useEffect(() => {
        sendNotification({
            title: '🎉Welcome to Campus Buddy🎉',
            body: `Your journey to a better campus experience just began!`
        })
        .catch(error => console.log('An error occured when trying to send a notification:\n', error))
    }, [expoPushToken])

    const screenWidth = Dimensions.get("window").width;
    const { startLoading, stopLoading } = useLoadingContext();

    const { navigateTo } = useNavigationContext();

    const openEventDetails = useCallback((id: string) => {
        navigateTo({ page: "EventDetails", id });
    }, []);

    const { refreshing, triggerRefresh, stopRefresh } = useRefreshControl();

    const onPullRefresh = useCallback(() => {
        triggerRefresh(() => {
            refetch()
        })
    }, [])

    const { data, isLoading, refetch, isFetchedAfterMount, isFetching } = useQuery({
        queryKey: ["home-page-events"],
        queryFn: fetchMainEvents,
    });

    useEffect(() => {
        if(isLoading)
            startLoading()
        else
            stopLoading()
    }, [isLoading])

    const queryIsLoading = isFetching && isFetchedAfterMount

    useEffect(() => {
        if(!queryIsLoading)
            stopRefresh()
    }, [queryIsLoading])

    if(!data)
        return <HomeSkeleton />

    const { allEvents, startingEvents } = data
    
    return (
        <View style={{ flex: 1 }}>
            <FlashList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} />}
                data={allEvents}
                estimatedItemSize={20}
                renderItem={HorizontalScrollElement}
                keyExtractor={item => item.id}
                ListHeaderComponent={
                    <View
                        style={{
                            justifyContent: "center",
                            marginBottom: 32,
                            alignItems: "center",
                        }}
                    >
                        <Carousel
                            loop={true}
                            autoplay={true}
                            autoplayInterval={5000}
                            showsControls={false}
                            style={{
                                width: screenWidth,
                                height: 214,
                            }}
                        >
                            {startingEvents.map(item => (
                                <TouchableOpacity
                                    key={item.image}
                                    onPress={() => openEventDetails(item.id)}
                                >
                                    <Image
                                        key={item.image}
                                        source={{ uri: generateImageURL(item.image) }}
                                        style={{ width: screenWidth, height: 214 }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </Carousel>
                    </View>
                }
            />
        </View>
    );
}