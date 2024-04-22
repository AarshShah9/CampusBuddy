import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import React, { useCallback } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";
import PricingCard from "~/components/PricingCard";
import { useRoute } from "@react-navigation/native";

export default function EventPricing() {
  const { navigateTo } = useNavigationContext();
  const {
    params: { title, subtitle, image, price, eventId },
  } = useRoute<any>();

  const checkout = useCallback(() => {
    navigateTo({ page: "EventPayment", eventId });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        padding: 16,
        marginTop: 15,
      }}
    >
      <Text
        style={{
          color: "black",
          fontSize: 20,
          fontWeight: "bold",
          alignSelf: "flex-start",
        }}
      >
        Your Cart
      </Text>
      <View
        style={{
          borderRadius: 20,
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
          backgroundColor: "white",
          width: 360,
          marginVertical: 20,
        }}
      >
        <PricingCard
          title={title}
          subtitle={subtitle}
          image={image}
          price={price}
        />
      </View>
      <Text
        style={{
          color: "grey",
          fontSize: 16,
          alignSelf: "flex-start",
          marginLeft: 20,
        }}
      >
        Subtotal: ${price}
      </Text>
      <View style={styles.container}>
        <View style={styles.line} />
        {/*<Text style={styles.text}>Or pay with card</Text>*/}
        <View style={styles.line} />
      </View>
      <Button
        style={{
          borderRadius: 8,
          width: 360,
          height: 48,
          marginTop: 20,
        }}
        mode="contained"
        onPress={checkout}
      >
        <Text
          style={{
            lineHeight: 30,
            fontSize: 24,
            fontWeight: "bold",
            color: "white",
            fontFamily: "Nunito-Bold",
          }}
        >
          Checkout
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: "grey",
  },
});
