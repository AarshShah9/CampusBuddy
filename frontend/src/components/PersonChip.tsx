import * as React from "react";
import { Chip, Text } from "react-native-paper";
import { ThemedText } from "./ThemedComponents";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components";

type PersonChipProps = {
  numberOfUsers: number;
};

export default function PersonChip({ numberOfUsers }: PersonChipProps) {
  const backgroundColor =
    numberOfUsers < 2 ? "rgb(224,167,140)" : "rgb(141,187,162)";
  return (
    <Chip
      style={{
        borderRadius: 29,
        height: 28,
        width: 98,
        marginLeft: 16,
        backgroundColor: backgroundColor,
      }}
    >
      <ChipContentContainer>
        <AntDesign name="user" size={12} color="black" />
        <RemainingUsersText>{numberOfUsers} Spots Left</RemainingUsersText>
      </ChipContentContainer>
    </Chip>
  );
}

const ChipContentContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  max-width: 127px;
`;

const RemainingUsersText = styled(Text)`
  font-size: 10px;
`;
