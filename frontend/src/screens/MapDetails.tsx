import { TouchableOpacity, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useCallback } from "react";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import useThemeContext from "~/hooks/useThemeContext";
import Map from "~/components/Map";

export default function MapDetails() {
  let {
    params: { eventData },
  } = useRoute<any>();
  const { theme } = useThemeContext();
  const navigation = useNavigation<any>();

  const returnPrevPage = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
