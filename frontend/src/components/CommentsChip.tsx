import * as React from "react";
import { Chip, Text } from "react-native-paper";
import { ThemedText } from "./ThemedComponents";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components";
import useThemeContext from "~/hooks/useThemeContext";

// Component to be rendered for the comments chip
export default function CommentsChip() {
  const { theme } = useThemeContext();
  return (
    // Parent containr for chip
    <StyledChip color={theme.colors.surface}>
      {/* Loads Icon and Text for chip */}
      <ChipContentContainer>
        <FontAwesome5
          name="comments"
          size={12}
          color={theme.colors.onSurface}
        />
        <CommentsText color={theme.colors.onSurface}>Comments</CommentsText>
      </ChipContentContainer>
    </StyledChip>
  );
}

// Styles used for children in the component
const StyledChip = styled(Chip)<{ color: string }>`
  border-radius: 29px;
  margin-right: 16px;
  height: 24px;
  width: 98px;
  background-color: ${(props) => props.color};
  border-width: 0.5px;
`;

const ChipContentContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const CommentsText = styled(Text)<{ color: string }>`
  font-size: 10px;
  margin-left: 4px;
  margin-right: 8px;
  color: ${(props) => props.color};
`;
