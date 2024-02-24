import * as React from "react";
import { Card, Text } from "react-native-paper";
import styled from "styled-components/native";
import LocationChip from "./LocationChip";
import { useFonts } from "expo-font";

type EventMainCardProps = {
  title: string;
  date: string;
  location: string;
  clubName: string;
};

export default function EventMainCard(props: EventMainCardProps) {
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("~/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Reg": require("~/assets/fonts/Nunito-Reg.ttf"),
    "Roboto-Reg": require("~/assets/fonts/Roboto-Reg.ttf"),
    "Roboto-Bold": require("~/assets/fonts/Roboto-Bold.ttf"),
  });

  return (
    <StyledCard>
      <StyledCover
        source={{ uri: "https://picsum.photos/700" }}
        resizeMode="cover"
      />
      <Card.Content
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <Card.Content>
          <CardTitle>{props.title}</CardTitle>
          <EventDateText>{props.date}</EventDateText>
          <LocationChip location={props.location}></LocationChip>
        </Card.Content>
        <Card.Content>
          <HostText>{props.clubName}</HostText>
          {/*<Card.Content></Card.Content>*/}
        </Card.Content>
      </Card.Content>
    </StyledCard>
  );
}

// prettier-ignore
const StyledCard = styled(Card)`
    width: 376px;
    height: 294px;
    margin-top: 16px;
    background-color: #f0f0f0;
`;
// prettier-ignore
const StyledCover = styled(Card.Cover)`
    width: calc(100% - 32px);
    height: 178px;
    margin: 8px;
`;
// prettier-ignore
const CardTitle = styled(Text)`
    margin-bottom: 4px;
    font-size: 30px;
    font-family: "Nunito-Bold";
`;
// prettier-ignore
const EventDateText = styled(Text)`
    margin-bottom: 4px;
    font-family: "Nunito-Reg";
    font-size: 12;
`;
// prettier-ignore
const HostText = styled(Text)`
    font-family: "Nunito-Bold";
    font-size: 12px;
    margin-top: 4px;
`;
