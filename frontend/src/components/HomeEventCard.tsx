import * as React from "react";
import { Card, Text } from "react-native-paper";
import LocationChip from "./LocationChip";
import styled from "styled-components";
import { View } from "react-native";
import { useFonts } from "expo-font";

type EventHomeCardProps = {
  eventData: { title: string; time: string; location: string; image: string };
};

export default function EventHomeCard({ eventData }: EventHomeCardProps) {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("frontend/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Reg": require("frontend/assets/fonts/Nunito-Reg.ttf"),
    "Roboto-Reg": require("frontend/assets/fonts/Roboto-Reg.ttf"),
    "Roboto-Bold": require("frontend/assets/fonts/Roboto-Bold.ttf"),
  });
  return (
    <StyledCard>
      <StyledCover
        source={{ uri: "https://picsum.photos/700" }}
        style={{ width: 159, height: 84 }}
      />
      <CardContent>
        <EventTitle>{eventData.title}</EventTitle>
        <EventDetailsContainer>
          <EventTime>{eventData.time}</EventTime>
          <LocationChip location={eventData.location} />
        </EventDetailsContainer>
      </CardContent>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  margin-left: 16px;
  margin-right: 16px;
  width: 159px;
  height: 130px;
  background-color: rgba(0, 0, 0, 0);
`;

const StyledCover = styled(Card.Cover)`
  width: 159px;
  height: 178px;
`;

const CardContent = styled(Card.Content)``;

const EventTitle = styled(Text)`
  font-family: Nunito-Bold;
`;

const EventTime = styled(Text)`
  font-family: Nunito-Reg;
  margin-right:8px;
`;

const EventDetailsContainer = styled(View)`
  flex-direction: row;
  justifycontent: "space-between";
`;
