import * as React from 'react';
import { Chip } from 'react-native-paper';
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
      <ChipContentContainer style={{}}>
        <Entypo name="location-pin" size={12} color="black" />
        <ThemedText style={{fontSize:10}}>{location}</ThemedText>
      </ChipContentContainer>
    </StyledChip>
  );
}


const StyledChip = styled(Chip)`
  border-radius: 29px;
  height: 28px;
  width: auto;
`;

const ChipContentContainer = styled(View)`
  flex-direction:row;
  alignItems:center;
  `;


 