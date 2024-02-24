import * as React from "react";
import { Chip, Text } from "react-native-paper";
import { ThemedText } from "./ThemedComponents";
import { EvilIcons } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components";

// Sets the Props of the Component
type LocationChipProps = {
  location: string;
};

// Component to render when LocationChip is used
export default function LocationChip({
  location,
}: Readonly<LocationChipProps>) {
  return (
    // Styled Chip component from React Native Paper
    <StyledChip>
      <ChipContentContainer>
        {/* Importing the icon into the component */}
        <EvilIcons name="location" size={12} color="black" />
        {/* Loading the prop location into the chip */}
        <LocationText>{location}</LocationText>
      </ChipContentContainer>
    </StyledChip>
  );
}

// Styles used for the Location Chip component
// prettier-ignore
const StyledChip = styled(Chip)`
    border-radius: 29px;
    height: 24px;
    width: 98px;
`;
// prettier-ignore
const ChipContentContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    margin-bottom: 3px;
`;
// prettier-ignore
const LocationText = styled(Text)`
    font-size: 10px;
`;
