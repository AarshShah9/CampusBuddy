import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import LocationChip from "./LocationChip";
import { limitTextToMax } from "~/lib/helperFunctions";

type EventMainCardProps = {
    title: string;
    date: string;
    location: string;
    clubName: string;
    picture: string
};

export default function MarketplaceItem(props: EventMainCardProps) {
    return (
        <Card style={styles.card}>
            <Card.Cover
                style={styles.cardCover}
                source={{ uri: props.picture }}
                resizeMode="cover"
            />
            <Card.Content style={styles.cardContent}>
                <Card.Content style={styles.topCardContent}>
                    <Text style={styles.cardTitle}>{limitTextToMax(props.title, 14)}</Text>
                    <Text style={styles.price}>{props.clubName}</Text>
                </Card.Content>
                <Card.Content style={styles.bottomCardContent}>
                    <LocationChip size={'small'} location={props.location}></LocationChip>
                </Card.Content>
            </Card.Content>
        </Card>
    );
}

// prettier-ignore
const styles = StyleSheet.create({
    // need to talk about these card widths and height
    card: {
        width: 187,
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