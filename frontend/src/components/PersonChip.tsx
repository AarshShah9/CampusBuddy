import * as React from "react";
import { Chip, Text } from "react-native-paper";
import { ThemedText } from "./ThemedComponents";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components";

export default function PersonChip() {
  return (
    <StyledChip>
      <ChipContentContainer>
        <AntDesign name="user" size={12} color="black" />
        <RemainingUsersText>X Spots Left</RemainingUsersText>
      </ChipContentContainer>
    </StyledChip>
  );
}

const StyledChip = styled(Chip)`
  border-radius: 29px;
  height: 28px;
  width: 98px;
  margin-left: 16px;
  background-color: rgba(44,108,58, 0.5);
`;

const ChipContentContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  max-width: 127px;
`;

const RemainingUsersText = styled(Text)`
  font-size: 10px;
`;
