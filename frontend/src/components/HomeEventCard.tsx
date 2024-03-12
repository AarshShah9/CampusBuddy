import LocationChip from "./LocationChip";
import { StyleSheet, View, Image } from "react-native";
import { ThemedText } from "./ThemedComponents";
import useThemeContext from "~/hooks/useThemeContext";
import { EventItem } from "~/contexts/eventsContext";
import { convertUTCToLocalDate } from "~/lib/timeFunctions";

export default function EventHomeCard(props: EventItem) {
  const { theme } = useThemeContext();
  return (
    <View style={styles.card}>
      <View style={styles.cardCover}>
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: props.image }}
        />
      </View>
      <View style={{ paddingHorizontal: 0 }}>
        <ThemedText style={styles.eventTitle}>{props.title}</ThemedText>
        <View style={styles.eventDetailsContainer}>
          {!!props.time && (
            <ThemedText style={styles.eventTime}>
              {convertUTCToLocalDate(props.time)}
            </ThemedText>
          )}
          <View>
            {props.location && (
              <LocationChip location={props.location} size="small" />
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

// prettier-ignore
const styles = StyleSheet.create({
    card: {
        width: 208,
        height: 170
    },
    cardCover: { 
        width: 208,
        height: 110,
        marginBottom: 5,
        borderRadius: 8,
        overflow: 'hidden'
    },
    eventTitle: {
        fontFamily: "Nunito-Bold",
        fontSize: 15,
        marginBottom: 4
    },
    eventDetailsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    eventTime: {
        fontFamily: "Nunito-Reg",
        marginRight: 8
    }
})
