import { FlatList, Text, View } from "react-native";
import React from "react";
import { Item } from "~/components/VerticalScrollView";
import EventHomeCard from "./HomeEventCard";

// Defines the type of each item in the horizontal scroll element
type Item2 = {
  title: string;
  items: Item[];
  id: string;
};

// Functional component that renders each horizontal scroll element
const HorizontalScrollElement = ({ item }: { item: Item2 }) => {
  return (
    // View containing the horizontal scroll element
    <View style={{ marginLeft: 16 }}>
      {/* Text displaying the title of the horizontal scroll element */}
      <Text
        style={{
          color: "black",
          fontSize: 16,
          paddingBottom: 16,
        }}
      >
        {item.title}
      </Text>
      {/* FlatList renders a horizontal scrollable list of cards */}
      <FlatList
        style={{paddingBottom:16}}
        data={item.items}
        renderItem={Cards}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

// Functional component that renders each card within the horizontal scroll element
const Cards = ({ item }: { item: Item }) => {
  return (
    // View containing each card
    <View>
      {/* EventHomeCard component renders the event card */}
      <Text style={{ paddingLeft: 16 }}>
        <EventHomeCard eventData={item} />
      </Text>
    </View>
  );
};
export default HorizontalScrollElement;
