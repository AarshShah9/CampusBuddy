import * as React from "react";
import { Chip, Text } from "react-native-paper";
import { ThemedText } from "./ThemedComponents";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components";

export default function CommentsChip() {
  return (
    <StyledChip>
      <ChipContentContainer>
        <FontAwesome5 name="comments" size={12} color="black" />
        <CommentsText>Comments</CommentsText>
      </ChipContentContainer>
    </StyledChip>
  );
}

const StyledChip = styled(Chip)`
  border-radius: 29px;
  height: 28px;
  background-color: white;
  borderWidth:0.5px;
`;

const ChipContentContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  max-width: 127px;
`;

const CommentsText = styled(Text)`
  font-size: 10px;
`;
