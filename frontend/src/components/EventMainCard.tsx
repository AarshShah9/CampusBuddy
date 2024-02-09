import * as React from "react";
import { Card, Text } from "react-native-paper";
import styled from "styled-components/native";
import LocationChip from "./LocationChip";
import { useFonts } from "expo-font";
import CardContent from "react-native-paper/lib/typescript/components/Card/CardContent";

export default function EventMainCard() {
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
          <CardTitle>Card title</CardTitle>
          <EventDateText>Card content</EventDateText>
          <LocationChip></LocationChip>
        </Card.Content>
        <Card.Content>
          <HostText>Club Name</HostText>
          <Card.Content></Card.Content>
        </Card.Content>
      </Card.Content>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 376px;
  height: 294px;
  margin-top: 16px;
  background-color: #f0f0f0;
`;

const StyledCover = styled(Card.Cover)`
  width: calc(100% - 32px);
  height: 178px;
  margin: 8px;
`;

const CardTitle = styled(Text)`
  margin-bottom: 4px;
  font-size: 30;
  font-family: "Nunito-Bold";
`;

const EventDateText = styled(Text)`
  margin-bottom: 4px;
  font-family: "Nunito-Reg";
  font-size: 12;
`;

const HostText = styled(Text)`
  font-family: "Nunito-Bold";
  font-size: 12px;
  margin-top: 4px;
`;
