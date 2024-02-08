import * as React from "react";
import { Chip, Text } from "react-native-paper";
import { ThemedText } from "./ThemedComponents";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components";

// Component to be rendered for the comments chip
export default function CommentsChip() {
  return (
    // Parent containr for chip
    <StyledChip>
      {/* Loads Icon and Text for chip */}
      <ChipContentContainer>
        <FontAwesome5 name="comments" size={12} color="black" />
        <CommentsText>Comments</CommentsText>
      </ChipContentContainer>
    </StyledChip>
  );
}

// Styles used for children in the component
const StyledChip = styled(Chip)`
  border-radius: 29px;
  margin-right: 16px;
  height: 24px;
  width: 98px;
  background-color: white;
  border-width: 0.5px;
`;

const ChipContentContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const CommentsText = styled(Text)`
  font-size: 10px;
  margin-left: 4px;
  margin-right: 8px;
`;
