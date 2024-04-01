import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import LocationChip from "./LocationChip";
import { limitTextToMax } from "~/lib/helperFunctions";
import { MarketPlaceCardProps } from "~/types/MarketPlaceItem";
import useNavigationContext from "~/hooks/useNavigationContext";
import { useCallback } from "react";

export default function MarketplaceItem(props: MarketPlaceCardProps) {
  const { navigateTo } = useNavigationContext();

  const openMarketPlaceDetail = useCallback(() => {
    navigateTo({ page: "MarketPlaceDetail", id: props.id });
  }, [props.id, navigateTo]);

  return (
    <TouchableOpacity onPress={openMarketPlaceDetail}>
      <Card style={styles.card}>
        <Card.Cover
          style={styles.cardCover}
          source={{ uri: props.image }}
          resizeMode="cover"
        />
        <Card.Content style={styles.cardContent}>
          <Card.Content style={styles.topCardContent}>
            <Text style={styles.cardTitle}>
              {limitTextToMax(props.title, 14)}
            </Text>
            <Text style={styles.price}>{props.price}</Text>
          </Card.Content>
          <Card.Content style={styles.bottomCardContent}>
            <LocationChip
              size={"small"}
              location={props.location}
            ></LocationChip>
          </Card.Content>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

// prettier-ignore
const styles = StyleSheet.create({
    // need to talk about these card widths and height
    card: {
        width: (Dimensions.get('window').width - 50) / 2,
        height: 205,
        marginTop: 16,
    },
    cardCover: {
        height: 130,
        margin: 12
    },
    cardContent: {
        paddingHorizontal: 12
    },
    topCardContent: {
        paddingHorizontal: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardTitle: {
        fontSize: 14,
        fontFamily: "Nunito-Bold"
    },
    price: {
        fontSize: 14,
        fontFamily: "Roboto-Bold"
    },
    bottomCardContent: {
        marginTop: 5,
        paddingHorizontal: 0,
    }
})
