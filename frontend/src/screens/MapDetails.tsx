import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import useThemeContext from "~/hooks/useThemeContext";
import useEventsContext from "~/hooks/useEventsContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import Map from "~/components/Map";

const IMG_HEIGHT = 300;

/**
 * This component is responsible for loading event details based on passed ID.
 * */

export default function MapDetails() {
  let {
    params: { eventData },
  } = useRoute<any>();
  const { theme } = useThemeContext();
  const navigation = useNavigation<any>();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);

  const returnPrevPage = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  console.log(eventData);

  return (
    <MainContainer color={theme.colors.primary}>
      <HeaderContainer>
        <TouchableOpacity onPress={returnPrevPage}>
          <AntDesign name="caretleft" size={24} color="white" />
        </TouchableOpacity>
      </HeaderContainer>
      <Map
        currentLocation={{
          latitude: eventData[0].latitude!,
          longitude: eventData[0].longitude!,
        }}
        events={eventData}
        showInfo={true}
      />
    </MainContainer>
  );
}

// prettier-ignore
const MainContainer = styled(View) <{ color: string }>`
    height: 100%;
    background-color: ${(props) => props.color};
`;
// prettier-ignore
const HeaderContainer = styled(View)`
    width: 100%;
    height: 60px; /* TODO this should be consistent across the app */
    justify-content: space-between;
    padding: 0 20px;
    flex-direction: row;
    align-items: center
`;
// prettier-ignore
const EDetails = styled(View)`
    margin-left: 10px;
    margin-top: 20px;
`;
// prettier-ignore
const EClubDetails = styled(View)`
    margin-right: 10px;
    margin-top: 25px;
    align-items: center;
`;
// prettier-ignore
const TagContainer = styled(View)`
    background-color: #b0cfff;
    width: 90%;
    border-radius: 8px;
    flex-direction: row;
    padding: 5px;
    margin-bottom: 5px;
`;
// prettier-ignore
const StyledButton = styled(Button)`
    border-radius: 8px;
    width: 100%;
    height: 48px;
    font-size: 25px;
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    justify-content: center;
`;
