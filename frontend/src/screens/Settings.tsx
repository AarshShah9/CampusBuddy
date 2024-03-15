import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import useProfileContext from "~/hooks/useProfileContext";
import { Ionicons } from "@expo/vector-icons";
import useThemeContext from "~/hooks/useThemeContext";
import { useNavigation } from "@react-navigation/native";

const snapPoints = ["45%"];

const settings = [
  "Notifications",
  "Search History",
  "Blocked Users",
  "Payments",
  "Requests",
];

export default function ProfileSettings() {
    const { theme } = useThemeContext();
    const { bottomSheetModalRef } = useProfileContext();
    const Backdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
    );
    const { closeModal } = useProfileContext();
    const navigation = useNavigation<any>();

    const goToSettingsPage = useCallback((setting: string) => {
        closeModal()
        navigation.navigate("Settings", { setting })
    }, [])

  return (
    <BottomSheetModal
      enablePanDownToClose={true}
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={Backdrop}
      backgroundStyle={{ borderRadius: 20 }} // play around with the number to find a suitable one
    >
      <View style={styles.contentContainer}>
        {settings.map((setting, i) => (
          <TouchableOpacity key={i} onPress={() => goToSettingsPage(setting)}>
            <View
              style={[
                styles.settingContainer,
                {
                  borderBottomColor: theme.colors.backdrop,
                },
              ]}
            >
              <Text style={styles.settingText}>{setting}</Text>
              <Ionicons name="chevron-forward" size={16} color={"#3a86ff"} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  settingContainer: {
    paddingVertical: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 0.8,
  },
  settingText: {
    fontSize: 16,
  },
});
