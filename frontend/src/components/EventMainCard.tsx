import { StyleSheet, TouchableOpacity } from "react-native";
import { Card, Text } from "react-native-paper";
import LocationChip from "./LocationChip";
import { limitTextToMax } from "~/lib/helperFunctions";
import { useCallback } from "react";
import { EventType } from "~/types/Events";
import useAppContext from "~/hooks/useAppContext";

export default function EventMainCard(props: EventType) {
  const { navigateTo } = useAppContext();
  const openEventDetails = useCallback(() => {
    navigateTo({ page: "EventDetails", id: props.id });
  }, []);

  return (
    <TouchableOpacity onPress={openEventDetails}>
      <Card style={styles.card}>
        <Card.Cover
          style={styles.cardCover}
          source={{ uri: props.image }}
          resizeMode="cover"
        />
        <Card.Content style={styles.cardContent}>
          <Card.Content style={styles.topCardContent}>
            <Text style={styles.cardTitle}>
              {limitTextToMax(props.title, 16)}
            </Text>
            <Text style={styles.hostText}>{props.clubName}</Text>
          </Card.Content>
          <Card.Content style={styles.bottomCardContent}>
            <Text style={styles.eventDateText}>{props.date}</Text>
            <LocationChip location={props.location}></LocationChip>
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
        width: "100%",
        height: 300,
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
})
