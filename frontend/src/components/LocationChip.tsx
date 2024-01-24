import * as React from 'react';
import { Chip } from 'react-native-paper';
import { ThemedText } from './ThemedComponents';
import { Entypo } from '@expo/vector-icons';


export default function LocationChip(){
  return (
    <Chip style={{borderRadius:29}} >
      <Entypo name="location-pin" size={12} color="black" />
      <ThemedText style={{fontSize:10}}>Location</ThemedText>
    </Chip>
  );
}
 