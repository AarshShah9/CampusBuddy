import * as React from "react";
import { ThemedText } from "~/components/ThemedComponents";
import { Card } from "react-native-paper";
import LocationChip from "./LocationChip";
import styled from "styled-components";
import { View } from "react-native";

type EventHomeCardProps = {
  eventData: { title: string; time: string; location: string; image: string };
};

export default function NOT_USING_THIS({ eventData }: EventHomeCardProps) {
  return (
    <CardContainer>
      <Card.Cover
        source={{ uri: "https://picsum.photos/700" }}
        style={{ width: 159, height: 84 }}
      />
      <Card.Content>
        <ThemedText>{eventData.title}</ThemedText>
        <EventDetailsContainer>
          <ThemedText>{eventData.time}</ThemedText>
          <LocationChip location={eventData.location}></LocationChip>
        </EventDetailsContainer>
      </Card.Content>
    </CardContainer>
  );
}

// prettier-ignore
const CardContainer = styled(Card)`
    margin-left: 16px;
    margin-right: 16px;
    width: 159px;
    height: 130px;
`;

// prettier-ignore
const EventDetailsContainer = styled(View)`
    flexdirection: "row";
    align-items: "center";
`;
