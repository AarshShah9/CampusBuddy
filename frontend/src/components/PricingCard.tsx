import { Text, View, Image } from "react-native";
import React from "react";

type PricingCardProps = {
  title: string;
  subtitle: string;
  image: string;
  price: number;
};

export default function PricingCard({
  title,
  subtitle,
  price,
  image,
}: PricingCardProps) {
  return (
    <View
      style={{
        margin: 10,
        padding: 16,
        borderRadius: 20,
        backgroundColor: "#FFFFFF",
        flexDirection: "row",
      }}
    >
      <View>
        <Image
          source={{ uri: image }}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            marginRight: 10,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
            alignSelf: "flex-start",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            color: "grey",
            fontSize: 16,
            alignSelf: "flex-start",
          }}
        >
          {subtitle}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "black",
            fontSize: 16,
            fontWeight: "bold",
            alignSelf: "flex-end",
          }}
        >
          ${price}
        </Text>
      </View>
    </View>
  );
}
