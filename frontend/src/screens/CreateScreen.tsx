import { StyleSheet, TouchableOpacity, View } from "react-native";
import useThemeContext from "~/hooks/useThemeContext";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import CreateEvent from "./CreateEvent";
import CreateLookingFor from "./CreateLookingFor";
import CreateMarketplace from "./CreateMarketplace";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const pages = [
  { label: "Event", value: "1" },
  { label: "Looking For", value: "2" },
  { label: "Marketplace", value: "3" },
];

// Component is responsible to hosting all the create page options and toggle between different pages based on drop down.
export default function CreateScreen() {
  const { theme } = useThemeContext();
  const [currentSelected, setCurrentSelected] = useState("1");
  const navigation = useNavigation<any>();

  return (
    <View style={{ backgroundColor: theme.colors.primary, flex: 1 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={navigation.goBack}>
          <MaterialIcons
            name="cancel"
            size={24}
            color="white"
            style={{ marginTop: 60, marginLeft: 10 }}
          />
        </TouchableOpacity>

        <Dropdown
          style={{ width: 125, marginTop: 50, paddingRight: 5 }}
          itemTextStyle={{ fontSize: 12, fontFamily: "Nunito-Medium" }}
          placeholderStyle={{ color: "white" }}
          selectedTextStyle={{
            color: "white",
            fontSize: 16,
            fontFamily: "Nunito-Bold",
          }}
          maxHeight={300}
          labelField="label"
          valueField="value"
          onChange={(item) => {
            setCurrentSelected(item.value);
          }}
          data={pages}
          placeholder="Event"
        />
      </View>
      {currentSelected == "1" && <CreateEvent />}
      {currentSelected == "2" && <CreateLookingFor />}
      {currentSelected == "3" && <CreateMarketplace />}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    width: "100%",
    height: 100,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
