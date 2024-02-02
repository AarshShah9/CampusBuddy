import * as React from 'react';
import { Card, Text } from 'react-native-paper';
import styled from 'styled-components/native';
import LocationChip from './LocationChip';


export default function EventMainCard() {
  return (
    <StyledCard>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content>
        <Text variant="titleLarge">Card title</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  width: 376px; 
  height: 294px; 
  margin-top: 16px;
`;



