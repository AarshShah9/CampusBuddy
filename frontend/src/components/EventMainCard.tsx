import { StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
import styled from "styled-components/native";
import LocationChip from "./LocationChip";
import { limitTextToMax } from "~/lib/helperFunctions";

type EventMainCardProps = {
    title: string;
    date: string;
    location: string;
    clubName: string;
    picture: string
};

export default function EventMainCard(props: EventMainCardProps) {
    return (
        <StyledCard>
            <StyledCover
                source={{ uri: props.picture }}
                resizeMode="cover"
            />
            <Card.Content style={styles.cardContent}>
                <Card.Content style={styles.topCardContent}>
                    <Text style={styles.cardTitle}>{limitTextToMax(props.title, 16)}</Text>
                    <Text style={styles.hostText}>{props.clubName}</Text>
                </Card.Content>
                <Card.Content style={styles.bottomCardContent}>
                    <Text style={styles.eventDateText}>{props.date}</Text>
                    <LocationChip location={props.location}></LocationChip>
                </Card.Content>
            </Card.Content>
        </StyledCard>
    );
}

// prettier-ignore
const styles = StyleSheet.create({
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

// need to talk about these card widths and height
// prettier-ignore
const StyledCard = styled(Card)`
    width: 100%;
    height: 300px;
    margin-top: 16px;
    background-color: #f1f1f1;
`;
// prettier-ignore
const StyledCover = styled(Card.Cover)`
    width: calc(100% - 32px);
    height: 178px;
    margin: 12px;
`;
