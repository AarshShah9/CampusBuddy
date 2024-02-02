import * as React from 'react';
import { Card, Text } from 'react-native-paper';
import styled from 'styled-components/native';
import LocationChip from './LocationChip';

export default function EventMainCard() {
  return (
    <StyledCard>
      <StyledCover source={{ uri: 'https://picsum.photos/700' }} resizeMode="cover"/>
      <Card.Content>
        <CardTitle variant="titleLarge">Card title</CardTitle>
        <EventDateText variant="bodyMedium">Card content</EventDateText>
        <LocationChip></LocationChip>
      </Card.Content>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 376px;
  height: 294px;
  margin-top: 16px;
  background-color: rgba(217, 217, 217, 0.2); 
`;

const CardTitle = styled(Text)`
  margin-bottom: 4px;
`;

const EventDateText = styled(Text)`
  margin-bottom: 8px;
`;

const StyledCover = styled(Card.Cover)`
  width: calc(100% - 32px); /* Subtracting 32px for padding (16px on each side) */
  height: 200px; /* Adjust the height as needed */
  margin: 16px; /* Applying margin to the Cover */
`;
