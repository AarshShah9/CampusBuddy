import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import LocationChip from "./LocationChip";
import { limitTextToMax } from "~/lib/helperFunctions";

type EventMainCardProps = {
  title: string;
  date: string;
  location: string;
  clubName: string;
  picture: string;
};

export default function EventMainCard(props: EventMainCardProps) {
  return (
    <Card style={styles.card}>
      <Card.Cover
        style={styles.cardCover}
        source={{ uri: props.picture }}
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
