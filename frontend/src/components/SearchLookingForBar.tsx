import * as React from "react";
import { List, Text } from "react-native-paper";
import { Dimensions, View, useWindowDimensions } from "react-native";
import styled from "styled-components";
import PersonChip from "./PersonChip";
import CommentsChip from "./CommentsChip";
import { useFonts } from "expo-font";

type LookingForProps ={
  lookingForData:{
    title: string;
    description: string;
    numberOfPeople: number;
  }
}

export default function LookingForItem({lookingForData}:LookingForProps) {
  const window = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("frontend/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Reg": require("frontend/assets/fonts/Nunito-Reg.ttf"),
    "Roboto-Reg": require("frontend/assets/fonts/Roboto-Reg.ttf"),
    "Roboto-Bold": require("frontend/assets/fonts/Roboto-Bold.ttf"),
  });
  
  return (
    <View style={{borderBottomWidth:0.5, borderBottomColor:"rgb(204, 204, 204)", height:174, width:window.width}}>
      <InfoContainer>
        <TitleText>
          {lookingForData.title}
        </TitleText>
        <DescriptionText>
          {lookingForData.description}
        </DescriptionText>
      </InfoContainer>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 'auto',
          marginBottom: 16
        }}
      >
        <PersonChip></PersonChip>
        <CommentsChip></CommentsChip>
      </View>
    </View>
  );
}

const InfoContainer = styled(View)`
  margin-top:16px;
  margin-right:16px;
  margin-left:16px;
`;

const TitleText = styled(Text)`
  font-family: Nunito-Bold;
  font-size:16px;
  margin-bottom:8px;
`;

const DescriptionText = styled(Text)`
  font-family: Roboto-Reg;
  font-size:12px;
  height: 64px;
  width:361px;
`;
