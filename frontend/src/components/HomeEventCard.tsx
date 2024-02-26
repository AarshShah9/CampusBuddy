import * as React from "react";
import { Card, Text } from "react-native-paper";
import LocationChip from "./LocationChip";
import styled from "styled-components";
import { View } from "react-native";
import { useFonts } from "expo-font";
import useThemeContext from "~/hooks/useThemeContext";
import { Item } from "~/components/VerticalScrollView";

// Component will generate the event card used on the home page of the application
export default function EventHomeCard(props: Item) {
  return (
    // Importing the Card component from React Native Paper and providing a style using styled-componenets
    <StyledCard>
      <StyledCover
        source={{ uri: "https://picsum.photos/700" }}
        style={{ width: 159, height: 84 }}
      />
      <CardContent>
        {/* Passing the event title props to the Card */}
        <EventTitle>{props.title}</EventTitle>
        <EventDetailsContainer>
          {/* Passing the event time and location to the Card and using the location component*/}
          <EventTime>{props.time}</EventTime>
          <LocationChip location={props.location} />
        </EventDetailsContainer>
      </CardContent>
    </StyledCard>
  );
}

// Adding styling to the seperate card components
// prettier-ignore
const StyledCard = styled(Card)`
    width: 159px;
    height: 130px;
    background-color: rgba(0, 0, 0, 0);
`;
// prettier-ignore
const StyledCover = styled(Card.Cover)`
    width: 159px;
    height: 178px;
`;
// prettier-ignore
const CardContent = styled(Card.Content)``;
// prettier-ignore
const EventTitle = styled(Text)`
    font-family: Nunito-Bold;
    font-size: 12px;
`;
// prettier-ignore
const EventTime = styled(Text)`
    font-family: Nunito-Reg;
    margin-right: 8px;
`;
// prettier-ignore
const EventDetailsContainer = styled(View)`
    flex-direction: row;
    justifycontent: "space-between";
`;
