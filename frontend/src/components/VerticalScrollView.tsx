import React from "react";
import { FlatList, Text, View } from "react-native";
import eventData from "~/mockData/EventData";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";

export type Item = {
  id: string;
  title: string;
  time?: string;
  location: string;
  image: string;
};

const VerticalScrollComponent = () => {
  const data2 = eventData;

  return (
    <FlatList
      data={data2}
      renderItem={HorizontalScrollElement}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        //Carosel
        <View
          style={{
            marginTop:14,
            height: 214,
            width: 326,
            backgroundColor: "blue",
            alignSelf: "center",
          }}
        ></View>
      }
    />
  );
};

export default VerticalScrollComponent;