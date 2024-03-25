import { View, FlatList } from "react-native";
import EventHomeCard from "~/components/HomeEventCard";
import { ThemedText } from "~/components/ThemedComponents";
import { EventData, EventItem } from "~/types/Events";
import LoadingSkeleton from "~/components/LoadingSkeleton";

// Functional component that renders each card within the horizontal scroll element
const Cards = ({ item, isLoading }: { item: EventItem, isLoading: boolean }) => {
    return (
        <View style={{ marginRight: 20 }}>
            <EventHomeCard event={item} isLoading={isLoading} />
        </View>
    );
};

export default function HorizontalScrollElement({ item, isLoading }: { item: EventData, isLoading: boolean }) {
    return (
        <View style={{ paddingLeft: 20 }}>
            {/* Text displaying the title of the horizontal scroll element */}
            <LoadingSkeleton show={isLoading} width="40%" height={23} radius={18}>
                <ThemedText style={{ fontFamily: "Nunito-Bold", fontSize: 20 }}>
                    {item.title}
                </ThemedText>
            </LoadingSkeleton>
            {/* FlatList renders a horizontal scrollable list of cards */}
            <View style={{ marginTop: 16, marginBottom: 24 }}>
                <FlatList
                    data={item.items}
                    extraData={isLoading}
                    renderItem={({ item }) => <Cards item={item} isLoading={isLoading} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
}