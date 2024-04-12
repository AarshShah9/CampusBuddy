import { View, FlatList } from "react-native";
import { Text } from "react-native-paper";
import EventHomeCard from "~/components/HomeEventCard";
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
            {isLoading ? 
                <LoadingSkeleton show width="40%" height={23} radius={18} />
                :<Text style={{ fontFamily: "Nunito-Bold", fontSize: 20 }}>
                    {item.title}
                </Text>
            }
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