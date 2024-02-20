import { View, Text } from "react-native";
import styled from "styled-components";
import useThemeContext from "~/hooks/useThemeContext";
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import CreateEvent from "./CreateEvent";
import CreateLookingFor from "./CreateLookingFor";
import { TouchableOpacity } from "react-native-gesture-handler";
import CreateMarketplace from "./CreateMarketplace";

const pages = [
  { label: "Event", value: "1" },
  { label: "Looking For", value: "2" },
  { label: "Marketplace", value: "3" },
];

export default function CreateScreen() {
  const { theme } = useThemeContext();
  const [currentSelected, setCurrentSelected] = useState("1");
  return (
    <MainContainer color={theme.colors.primary}>
      <HeaderContainer>
          <MaterialIcons
            style={{ marginTop: 60, marginLeft: 10 }}
            name="cancel"
            size={24}
            color="white"
          />
        <Dropdown
          style={{ width: 125, marginTop: 50, paddingRight: 5 }}
          placeholderStyle={{ color: "white", paddingLeft: 40 }}
          selectedTextStyle={{ color: "white" }}
          maxHeight={300}
          labelField="label"
          valueField="value"
          onChange={(item) => {
            setCurrentSelected(item.value);
          }}
          data={pages}
          placeholder="Event"
        />
      </HeaderContainer>
      {currentSelected == "1" && <CreateEvent />}
      {currentSelected == "2" && <CreateLookingFor/>}
      {currentSelected == "3" && <CreateMarketplace/>}
    </MainContainer>
  );
}

const MainContainer = styled(View)<{ color: string }>`
  height: 100%;
  background-color: ${(props) => props.color};
`;

const HeaderContainer = styled(View)`
  width: 100%;
  height: 100px;
  justify-content: space-between;
  flex-direction: row;
`;
