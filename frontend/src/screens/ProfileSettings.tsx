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

const snapPoints = ["45%"];

const settings = [
  "Settings and Privacy",
  "Archive",
  "My activity",
  "Saved",
  "Personal Information",
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

  return (
    <BottomSheetModal
      enablePanDownToClose={true}
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={Backdrop}
    >
      <View style={styles.contentContainer}>
        {settings.map((setting, i) => (
          <TouchableOpacity key={i}>
            <View
              style={[
                styles.settingContainer,
                {
                  borderBottomColor: theme.colors.backdrop,
                },
              ]}
            >
              <Text style={styles.settingText}>{setting}</Text>
              <Ionicons name="chevron-forward" size={24} color={"#3a86ff"} />
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
    borderBottomWidth: 0.5,
  },
  settingText: {
    fontSize: 16,
  },
});
