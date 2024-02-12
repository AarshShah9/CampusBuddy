import * as React from "react";
import { Chip, Text } from "react-native-paper";
import { ThemedText } from "./ThemedComponents";
import { AntDesign } from "@expo/vector-icons";
import { View } from "react-native";
import styled from "styled-components";

// Setting the props for the component
type PersonChipProps = {
  numberOfUsers: number;
};

// The component to be rendered for when a people requried
export default function PersonChip({ numberOfUsers }: PersonChipProps) {
  // setting the ternary properties for the background to change depending on spots remaining
  const backgroundColor =
    numberOfUsers < 2 ? "rgb(224,167,140)" : "rgb(141,187,162)";
  return (
    //Loads the parent Chip with desired style
    <Chip
      style={{
        borderRadius: 29,
        height: 24,
        maxWidth: 98,
        padding: 0,
        marginLeft: 16,
        backgroundColor: backgroundColor,
      }}
    >
      {/* Container for the icon and prop data for the Icon */}
      <ChipContentContainer>
        <AntDesign name="user" size={12} color="black" lineThickness={5} />
        <RemainingUsersText>{numberOfUsers} Spots Left</RemainingUsersText>
      </ChipContentContainer>
    </Chip>
  );
}

// The style used for the children used in the Chip
const ChipContentContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const RemainingUsersText = styled(Text)`
  font-size: 10px;
`;
