import { Card, Text } from "react-native-paper";
import styled from "styled-components/native";
import LocationChip from "./LocationChip";
import useThemeContext from "~/hooks/useThemeContext";

// Sets the Props for the component
type EventSearchCardProps = {
  eventData: {
    title: string;
    time: string;
    location: string;
    image: string;
    host: string;
  };
};

// Component to render for the event card used in the Search results
export default function EventCard({ eventData }: EventSearchCardProps) {
  const { theme } = useThemeContext();

  return (
    // Styled Card Compponent
    <StyledCard color={theme.colors.surfaceVariant}>
      {/* Styled Card Cover Component */}
      <StyledCover
        source={{ uri: "https://picsum.photos/700" }}
        resizeMode="cover"
      />
      {/* This container contains all the information related to the card */}
      <Card.Content style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <Card.Content>
          <CardTitle>{eventData.title}</CardTitle>
          <EventDateText>{eventData.time}</EventDateText>
          {/*This Component renders the location chip and loads the location into the chip*/}
          <LocationChip location={eventData.location} />
        </Card.Content>
        <Card.Content>
          {/* This Component renders the host name*/}
          <HostText>{eventData.host}</HostText>
        </Card.Content>
      </Card.Content>
    </StyledCard>
  );
}

// Setting the styles for the children in this Component
// prettier-ignore
const StyledCard = styled(Card)<{ color: string }>`
    width: 374px;
    height: 294px;
    margin-top: 16px;
    background-color: ${(props) => props.color};
`;
// prettier-ignore
const StyledCover = styled(Card.Cover)`
    width: calc(100% - 32px);
    height: 178px;
    margin: 8px;
    font-color: theme.color.onPrimary;
`;
// prettier-ignore
const CardTitle = styled(Text)`
    margin-bottom: 4px;
    font-size: 16px;
    font-family: "Nunito-Bold";
    margin-right: 120px;
`;
// prettier-ignore
const EventDateText = styled(Text)`
    margin-bottom: 8px;
    font-family: "Nunito-Reg";
    font-size: 12px;
`;
// prettier-ignore
const HostText = styled(Text)`
    font-family: Nunito-Bold;
    font-size: 12px;
    margin-top: 4px;
`;
