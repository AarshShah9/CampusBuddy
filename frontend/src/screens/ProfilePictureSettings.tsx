import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import useProfileContext from "~/hooks/useProfileContext";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import useThemeContext from "~/hooks/useThemeContext";
import useAuthContext from "~/hooks/useAuthContext";

const snapPoints = ["25%"];

const settings = ["Upload Picture", "Delete Picture"];

export default function ProfilePictureSettings() {
  const { theme } = useThemeContext();
  const { bottomSheetPictureModalRef, onUpload, onDelete } =
    useProfileContext();
  const {} = useAuthContext();
  const Backdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  return (
    <BottomSheetModal
      enablePanDownToClose={true}
      ref={bottomSheetPictureModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={Backdrop}
      handleIndicatorStyle={{ backgroundColor: "grey" }} // todo change this to use theme
      backgroundStyle={{ borderRadius: 20 }}
    >
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={onUpload}>
          <View
            style={[
              styles.settingContainer,
              {
                borderBottomColor: theme.colors.backdrop,
              },
            ]}
          >
            <Ionicons
              name="image-outline"
              size={24}
              color="black"
              style={styles.icon}
            />

            <Text style={styles.settingText}>Upload Picture</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete}>
          <View
            style={[
              styles.settingContainer,
              {
                borderBottomColor: theme.colors.backdrop,
              },
            ]}
          >
            <MaterialIcons
              name={"delete-outline"}
              size={24}
              color="#eb3636"
              style={styles.icon}
            />
            <Text style={styles.deleteText}>Delete</Text>
          </View>
        </TouchableOpacity>
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
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 0.8,
  },
  settingText: {
    fontSize: 16,
    fontWeight: "400",
  },
  deleteText: {
    color: "#eb3636",
    fontSize: 16,
    fontWeight: "500",
  },
  icon: {
    paddingRight: 15,
  },
});
