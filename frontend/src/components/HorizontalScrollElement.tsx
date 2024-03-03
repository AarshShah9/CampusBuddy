import { FlatList, View } from "react-native";
import EventHomeCard from "./HomeEventCard";
import { ThemedText } from "./ThemedComponents";

export type Item = {
    id: string;
    title: string;
    time?: string;
    location: string;
    image: string;
};

// Functional component that renders each card within the horizontal scroll element
const Cards = ({ item }: { item: Item }) => {
    return (
        <View style={{ marginRight: 20 }}>
            <EventHomeCard {...item} />
        </View>
    );
};

// Defines the type of each item in the horizontal scroll element
type Item2 = {
    title: string;
    items: Item[];
    id: string;
};


export default function HorizontalScrollElement({ item }: { item: Item2 }) {
    return (
        <View style={{ paddingLeft: 20 }}>
            {/* Text displaying the title of the horizontal scroll element */}
            <ThemedText
                style={{
                    fontFamily: "Nunito-Bold", 
                    fontSize: 20,
                    marginBottom: 16,
                }}
            >
                {item.title}
            </ThemedText>
            {/* FlatList renders a horizontal scrollable list of cards */}
            <FlatList
                style={{ marginBottom: 24 }}
                data={item.items}
                renderItem={Cards}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};