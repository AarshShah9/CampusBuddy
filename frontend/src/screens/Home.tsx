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
import { EventData, EventType } from "~/types/Events";
import LoadingSkeleton from "~/components/LoadingSkeleton";

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

    /**
     * the data is {"allEvents": [{"id": "1", "items": [Array], "title": "Attending"}, {"id": "2", "items": [Array], "title": "Upcoming Events From Following"}, {"id": "3", "items": [Array], "title": "Trending Events"}, {"id": "4", "items": [Array], "title": "Happening Today"}, {"id": "5", "items": [Array], "title": "Explore Verified Organizations"}], "startingEvents": [{"id": "79bc7200-c551-11ee-83fd-6f8d6c450910", "image": "https://d2epenzoyf672m.cloudfront.net/pfp/calgaryExpo.jpg", "title": "Career Fair"}]}
     */
    
    const allEvents = data ? data.allEvents : []
    const startingEvents = data ? data.startingEvents : []

    return (
        <View style={{ flex: 1 }}>
            <FlashList
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onPullRefresh} />}
                data={allEvents}
                estimatedItemSize={20}
                extraData={queryIsLoading}
                renderItem={({ item }) => <HorizontalScrollElement item={item} isLoading={queryIsLoading} />}
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
                                <LoadingSkeleton 
                                    key={item.image} 
                                    show={queryIsLoading} 
                                    width={screenWidth} height={214} radius='square'>
                                    <TouchableOpacity onPress={() => openEventDetails(item.id)}>
                                        <Image
                                            key={item.image}
                                            source={{ uri: generateImageURL(item.image) }}
                                            style={{ width: screenWidth, height: 214 }}
                                        />
                                    </TouchableOpacity>
                                </LoadingSkeleton>
                            ))}
                        </Carousel>
                    </View>
                }
            />
        </View>
    );
}