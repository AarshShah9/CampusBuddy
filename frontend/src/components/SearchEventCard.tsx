import * as React from "react";
import { Card, Text } from "react-native-paper";
import styled from "styled-components/native";
import LocationChip from "./LocationChip";
import { useFonts } from "expo-font";

type EventSearchCardProps = {
  eventData: {
    title: string;
    time: string;
    location: string;
    image: string;
    host: string;
  };
};

export default function EventCard({ eventData }: EventSearchCardProps) {
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
        resizeMode="cover"
      />
      <Card.Content style={{ flexDirection: "row", alignItems: 'flex-start' }}>
        <Card.Content>
          <CardTitle>{eventData.title}</CardTitle>
          <EventDateText>{eventData.time}</EventDateText>
          <LocationChip location={eventData.location}></LocationChip>
        </Card.Content>
        <Card.Content>
          <HostText>{eventData.host}</HostText>
        </Card.Content>
      </Card.Content>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 374px;
  height: 294px;
  margin-top: 16px;
  background-color: rgb(234,232,227) ;
`;

const StyledCover = styled(Card.Cover)`
  width: calc(100% - 32px);
  height: 178px;
  margin: 8px;
`;

const CardTitle = styled(Text)`
  margin-bottom: 4px;
  font-size: 16px;
  font-family: "Nunito-Bold";
  margin-right: 120px;
`;

const EventDateText = styled(Text)`
  margin-bottom: 8px;
  font-family: "Nunito-Reg";
  font-size: 12px;
`;

const HostText = styled(Text)`
  font-family: Nunito-Bold;
  font-size: 12px;
  margin-top: 4px;
`;
