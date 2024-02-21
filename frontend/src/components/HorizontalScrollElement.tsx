import { FlatList, Text, View } from "react-native";
import React from "react";
import { Item } from "~/components/VerticalScrollView";
import EventHomeCard from "./HomeEventCard";

type Item2 = {
  title: string;
  items: Item[];
  id: string;
};

const HorizontalScrollElement = ({ item }: { item: Item2 }) => {
  return (
    <View style={{marginLeft:16}}>
      <Text
        style={{
          color: "white",
          fontSize: 16,
          paddingBottom: 16,
          paddingLeft:16
        }}
      >
        {item.title}
      </Text>
      <FlatList
        style={{ marginBottom: 0, height: 168}}
        data={item.items}
        renderItem={Cards}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const Cards = ({ item }: { item: Item }) => {
  return (
    <View>
      <Text style={{paddingLeft:16}}>
        <EventHomeCard eventData={item} />
      </Text>
    </View>
  );
};
export default HorizontalScrollElement;
