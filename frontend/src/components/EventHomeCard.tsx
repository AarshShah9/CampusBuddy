import * as React from 'react';
import { ThemedText } from '~/components/ThemedComponents';
import { Card } from 'react-native-paper';
import LocationChip from './LocationChip';
import styled from 'styled-components';
import { View } from 'react-native';

type EventHomeCardProps = {
  eventData: { title: string; time: string; location: string; image: string };
};

export default function EventHomeCard({ eventData }: EventHomeCardProps) {
  return (
    <StyledCard>
      <StyledCover source={{ uri: 'https://picsum.photos/700' }} style={{ width: 159, height: 84 }} />
      <CardContent>
        <ThemedText>{eventData.title}</ThemedText>
        <EventDetailsContainer>
          <ThemedText>{eventData.time}</ThemedText>
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

const CardContent = styled(Card.Content)`
`;

const EventDetailsContainer = styled(View)`
  flex-direction:row;
  justifyContent: "space-between";
`;