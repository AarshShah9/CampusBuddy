import LocationChip from "./LocationChip";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { ThemedText } from "./ThemedComponents";
import { convertUTCToLocalDate } from "~/lib/timeFunctions";
import { EventItem } from "~/types/Events";
import { useCallback } from "react";
import { generateImageURL } from "~/lib/CDNFunctions";
import useNavigationContext from "~/hooks/useNavigationContext";
import LoadingSkeleton from "./LoadingSkeleton";

type Props = {
    event: EventItem,
    isLoading: boolean
}
export default function EventHomeCard({ event, isLoading }: Props) {
    const { navigateTo } = useNavigationContext();
    const openEventDetails = useCallback(() => {
        if(event.event)
            navigateTo({ page: "EventDetails", id: event.id });
    }, [event]);

    return (
        <TouchableOpacity onPress={openEventDetails}>
            <View style={styles.card}>
                <View style={styles.cardCover}>
                    <LoadingSkeleton show={isLoading} width="100%" height="100%">
                        <Image
                            style={{ width: "100%", height: "100%" }}
                            source={{ uri: generateImageURL(event.image) }}
                        />
                    </LoadingSkeleton>
                </View>
                <View style={{ paddingHorizontal: 0 }}>
                    <LoadingSkeleton show={isLoading} width="80%" height={16}>
                        <ThemedText style={styles.eventTitle}>{event.title}</ThemedText>
                    </LoadingSkeleton>
                    <View style={styles.eventDetailsContainer}>
                        {isLoading ?
                            <LoadingSkeleton show width={100} height={16} />
                            :<>
                                {!!event.time && (
                                    <ThemedText style={styles.eventTime}>
                                        {convertUTCToLocalDate(event.time)}
                                    </ThemedText>
                                )}
                                <View>
                                    {event.location && (
                                        <LocationChip location={event.location} size="small" />
                                    )}
                                </View>
                            </>
                        }
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

// prettier-ignore
const styles = StyleSheet.create({
    card: {
        width: 208,
        height: 170
    },
    cardCover: {
        width: 208,
        height: 110,
        marginBottom: 5,
        borderRadius: 8,
        overflow: 'hidden'
    },
    eventTitle: {
        fontFamily: "Nunito-Bold",
        fontSize: 15,
    },
    eventDetailsContainer: {
        marginTop: 4,
        flexDirection: 'row',
        alignItems: 'center'
    },
    eventTime: {
        fontFamily: "Nunito-Reg",
        marginRight: 8
    }
})