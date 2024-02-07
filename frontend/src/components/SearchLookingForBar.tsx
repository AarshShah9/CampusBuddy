import * as React from "react";
import { List } from "react-native-paper";
import { Dimensions, View, useWindowDimensions } from "react-native";
import styled from "styled-components";
import PersonChip from "./PersonChip";
import CommentsChip from "./CommentsChip";

export default function LookingForItem() {
  const window = useWindowDimensions();
  return (
    <View
      style={{
        height: 174,
        marginLeft: 16,
        marginRight: 16,
        marginBottom: 16,
        width: window.width,
        borderBottomWidth: 1,
        borderBottomColor: "rgb(147, 142, 148)",
      }}
    >
      <PostBar
        title="Title of the Post"
        description="lorem ipsum dolor sit amet, consectetur adip, lorem ipsum dolor sit amet"
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop:24 }}>
        <PersonChip></PersonChip>
        <CommentsChip></CommentsChip>
      </View>
    </View>
  );
}

const PostBar = styled(List.Item)`
  paddingvertical: 16px;
`;

const PostBarTitle = styled(List.Item)``;
