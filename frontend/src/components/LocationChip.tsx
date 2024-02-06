import * as React from 'react';
import { Chip, Text } from 'react-native-paper';
import { ThemedText } from './ThemedComponents';
import { Entypo } from '@expo/vector-icons';
import { View } from 'react-native';
import styled from 'styled-components';

type LocationChipProps ={
  location: string;
}

export default function LocationChip({location}: Readonly<LocationChipProps>){
  return (
    <StyledChip>
      <ChipContentContainer>
        <Entypo name="location-pin" size={12} color="black" />
        <LocationText>{location}</LocationText>
      </ChipContentContainer>
    </StyledChip>
  );
}

const StyledChip = styled(Chip)`
  border-radius: 29px;
  height: 28px;
`;

const ChipContentContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  max-width: 127px; 
`;

const LocationText = styled(Text)`
  font-size:10px;
`;
