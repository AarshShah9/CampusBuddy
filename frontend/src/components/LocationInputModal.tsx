import {
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useCallback, useState } from "react";
import useThemeContext from "~/hooks/useThemeContext";

export default function LocationInputModal(props: { controllerOnChange: any }) {
  const [location, setLocation] = useState("Search");
  const [modalVisible, setModalVisible] = useState(false);
  const { theme } = useThemeContext();
  const showModal = useCallback(() => {
    setModalVisible(!modalVisible);
  }, [modalVisible]);
  const userLocation = useCallback(
    (text: string) => {
      setLocation(text);
      setModalVisible(false);
      props.controllerOnChange(text);
    },
    [location],
  );

  return (
    <View>
      <TouchableWithoutFeedback onPress={showModal}>
        <View style={styles.buttonContainer}>
          <Entypo
            style={{ marginLeft: 8 }}
            name="location-pin"
            size={24}
            color="black"
          />
          <Text style={styles.textStyle}>{location}</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible}>
        <View style={{ flex: 1 }}>
          <View
            style={[
              styles.modalHeaderContainer,
              { backgroundColor: theme.colors.primary },
            ]}
          >
            <MaterialIcons
              style={{ marginLeft: 10, marginTop: 60 }}
              name="cancel"
              size={24}
              color="white"
              onPress={showModal}
            />
          </View>
          <View style={styles.modalContainer}>
            <Entypo
              style={{ marginLeft: 10, marginTop: 10 }}
              name="location-pin"
              size={24}
              color="black"
            />
            <GooglePlacesAutocomplete
              onPress={(data) => {
                userLocation(data.place_id);
              }}
              styles={{
                textInput: {
                  flexGrow: 1,
                },
                description: {
                  fontSize: 12,
                  margin: 1,
                  flex: 1,
                  fontFamily: "Roboto-Reg",
                },
              }}
              placeholder={"Search"}
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en",
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "grey",
    flexDirection: "row",
    alignItems: "center",
  },
  modalContainer: {
    flexDirection: "row",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 5,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "black",
  },
  modalHeaderContainer: {
    width: "100%",
    height: 100,
    backgroundColor: "grey",
  },
  textStyle: {
    fontSize: 12,
    margin: 1,
    flex: 1,
    fontFamily: "Roboto-Reg",
  },
});
