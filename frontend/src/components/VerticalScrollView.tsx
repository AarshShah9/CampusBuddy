import React from "react";
import { Dimensions, FlatList, Text, View, Image } from "react-native";
import eventData from "~/mockData/EventData";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";
import Carousel from "pinar";
import styled from "styled-components/native";

export type Item = {
  id: string;
  title: string;
  time?: string;
  location: string;
  image: string;
};

const images = [
  "https://picsum.photos/700",
  "https://picsum.photos/600",
  "https://picsum.photos/800",
  "https://picsum.photos/900",
];

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const VerticalScrollComponent = () => {
  const data2 = eventData;
  return (
    <FlatList
      data={data2}
      renderItem={HorizontalScrollElement}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View
          style={{
            justifyContent: "center",
            marginTop: 14,
            marginBottom: 36,
            alignItems: "center",
          }}
        >
          <Carousel
            autoplay={true}
            autoplayInterval={5000}
            showsControls={false}
            style={{ height: 214, width: 326 }}
          >
            {images.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={{ width: 326, height: 214, borderRadius: 8 }}
              />
            ))}
          </Carousel>
        </View>
      }
    />
  );
};

export default VerticalScrollComponent;
