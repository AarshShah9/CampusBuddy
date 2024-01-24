import * as React from 'react';
import {ThemedText} from '~/components/ThemedComponents';
import {Card, Text } from 'react-native-paper';
import LocationChip from './LocationChip';
import styled from "styled-components"
import { View } from 'react-native';

export default function EventHomeCard() {  
    return (
      <CardContainer>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{width: 159, height:84}}/>
        <Card.Content>
          <ThemedText>Card title</ThemedText>
          <EventDetailsContainer>
            <ThemedText>Event Date</ThemedText>
            <LocationChip></LocationChip>
          </EventDetailsContainer>
        </Card.Content>
      </CardContainer>
    );
  };

  const CardContainer = styled(Card)`
  marginLeft: 16;
  marginRight:16;
  width:159;
  height:130;
  `;

  const EventDetailsContainer = styled(View)`
    flexDirection:'row';
    align-items:'center';
  `;

