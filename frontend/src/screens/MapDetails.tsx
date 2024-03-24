import { TouchableOpacity, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import styled from "styled-components";
import useThemeContext from "~/hooks/useThemeContext";
import Map from "~/components/Map";
import useNavigationContext from "~/hooks/useNavigationContext";

export default function MapDetails() {
  let {
    params: { eventData },
  } = useRoute<any>();
  const { theme } = useThemeContext();

  const { navigateBack } = useNavigationContext();

  return (
    <MainContainer color={theme.colors.primary}>
      <HeaderContainer>
        <TouchableOpacity onPress={navigateBack}>
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
