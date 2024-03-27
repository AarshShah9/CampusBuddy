import {
  View,
  TouchableWithoutFeedback,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";
import MarketplaceItem from "~/components/MarketplaceItem";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";
import { useQuery } from "@tanstack/react-query";
import { MarketPlaceCardProps } from "~/types/Events";
import { getMarketPlaceItems } from "~/lib/apiFunctions/Events";
import { generateImageURL } from "~/lib/CDNFunctions";

export default function Marketplace() {
  const { dismissKeyboard } = useAppContext();

  const { data: marketplaceItems } = useQuery<MarketPlaceCardProps[]>({
    queryKey: ["marketplace-items"],
    queryFn: getMarketPlaceItems,
    initialData: [],
  });

  if (!Array.isArray(marketplaceItems)) {
    console.log("WHY IS THIS TURNING NULL - Marketplace");
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView style={{ flex: 1 }}>
        <Pressable style={{ paddingVertical: 20 }}>
          <ThemedText
            style={{ paddingLeft: 20, fontFamily: "Nunito-Bold", fontSize: 24 }}
          >
            Marketplace
          </ThemedText>
          <View style={styles.itemsContainer}>
            {marketplaceItems &&
              marketplaceItems.map((item) => (
                <MarketplaceItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  date={""}
                  location={item.location}
                  price={`$${item.price}`}
                  image={generateImageURL(item.image)!}
                />
              ))}
          </View>
        </Pressable>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  itemsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  },
});
