import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Card, Text } from "react-native-paper";
import LocationChip from "./LocationChip";
import { limitTextToMax } from "~/lib/helperFunctions";
import { useCallback } from "react";
import { EventType } from "~/types/Events";
import useNavigationContext from "~/hooks/useNavigationContext";
import { generateImageURL } from "~/lib/CDNFunctions";

export default function EventMainCard(props: EventType) {
  const { navigateTo } = useNavigationContext();
  const openEventDetails = useCallback(() => {
    navigateTo({ page: "EventDetails", id: props.id });
  }, []);

  return (
    <TouchableOpacity onPress={openEventDetails}>
      <Card style={styles.card}>
        <Card.Cover
          style={styles.cardCover}
          source={{ uri: generateImageURL(props.image) }}
          resizeMode="cover"
        />
        <View style={styles.locationChipContainer}>
          <LocationChip location={props.location} />
        </View>
        <Card.Content style={styles.cardContent}>
          <Card.Content style={styles.topCardContent}>
            <Text style={styles.cardTitle}>
              {limitTextToMax(props.title, 24)}
            </Text>
          </Card.Content>

          <Card.Content style={styles.bottomCardContent}>
            <Text style={styles.hostText}>{props.clubName}</Text>
            <Text style={styles.eventDateText}>{props.date}</Text>
          </Card.Content>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

// prettier-ignore
const styles = StyleSheet.create({
    // need to talk about these card widths and height
    cardCoverContainer: {
            position: 'relative',
        },
    card: {
        width: "100%",
        height: 280,
        marginTop: 16,
    },
    cardCover: {
        height: 178,
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
        fontSize: 24,
        fontFamily: "Nunito-Bold"
    },
    hostText: {
        fontSize: 12,
        fontFamily: "Nunito-Bold",
        fontWeight: 'bold'
    },
    bottomCardContent: {
        paddingHorizontal: 0,
    },
    eventDateText: {
        fontSize: 12,
        fontFamily: "Nunito-Reg",
        marginBottom: 8
    },
    locationChipContainer: {
        position: 'absolute',
        bottom: 95,
        right: 16,
        zIndex: 1,
    },
})
