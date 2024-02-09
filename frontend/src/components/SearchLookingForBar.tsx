import * as React from "react";
import { List, Text } from "react-native-paper";
import { Dimensions, View, useWindowDimensions } from "react-native";
import styled from "styled-components";
import PersonChip from "./PersonChip";
import CommentsChip from "./CommentsChip";
import { useFonts } from "expo-font";

// Sets the Props for the Looking for component
type LookingForProps = {
  lookingForData: {
    title: string;
    description: string;
    requiredMembers: number;
  };
};

// Component to render for the look for component
export default function LookingForItem({ lookingForData }: LookingForProps) {
  // Loading the fonts into the component
  const window = useWindowDimensions();
  const [fontsLoaded] = useFonts({
    "Nunito-Bold": require("~/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Reg": require("~/assets/fonts/Nunito-Reg.ttf"),
    "Roboto-Reg": require("~/assets/fonts/Roboto-Reg.ttf"),
    "Roboto-Bold": require("~/assets/fonts/Roboto-Bold.ttf"),
  });
  return (
    // Creating the primairy Container
    <View
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: "rgb(204, 204, 204)",
        height: 174,
        width: window.width,
      }}
    >
      {/* Setting the container with all the information */}
      <InfoContainer>
        {/* loading the Title and Description of the post to the component*/}
        <TitleText>{lookingForData.title}</TitleText>
        <DescriptionText>{lookingForData.description}</DescriptionText>
      </InfoContainer>
      {/* Creating the container for the chips */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "auto",
          marginBottom: 16,
        }}
      >
        {/* Loading the Person chip with the data */}
        <PersonChip numberOfUsers={lookingForData.requiredMembers} />
        {/* Loading the Comments Chip */}
        <CommentsChip />
      </View>
    </View>
  );
}

// Setting the Styles for the children used in this component
const InfoContainer = styled(View)`
  margin-top: 16px;
  margin-right: 16px;
  margin-left: 16px;
`;

const TitleText = styled(Text)`
  font-family: Nunito-Bold;
  font-size: 16px;
  margin-bottom: 8px;
`;

const DescriptionText = styled(Text)`
  font-family: Roboto-Reg;
  font-size: 12px;
  height: 48px;
  width: 361px;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 16px;
  numberoflines: 3;
`;
