import * as React from 'react';
import {ThemedText} from '~/components/ThemedComponents';
import {Card, Text } from 'react-native-paper';

export default function EventHomeCard() {  
    return (
<Card style={{marginLeft: 16, marginRight:16,width:159, height:130}}>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={{width: 159, height:84}}/>
    <Card.Content>
      <ThemedText>Card title</ThemedText>
      <ThemedText>Card content</ThemedText>
    </Card.Content>
  </Card>
    );
  };

