import { FlatList, View } from "react-native";
import EventHomeCard from "./HomeEventCard";
import { ThemedText } from "./ThemedComponents";
import { EventData, EventItem } from "~/types/Events";

// Functional component that renders each card within the horizontal scroll element
const Cards = ({ item }: { item: EventItem }) => {
  return (
    <View style={{ marginRight: 20 }}>
      <EventHomeCard {...item} />
    </View>
  );
};

export default function HorizontalScrollElement({ item }: { item: EventData }) {
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
}
