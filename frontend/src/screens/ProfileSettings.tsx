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
import useNavigationContext from "~/hooks/useNavigationContext";
import useAuthContext from "~/hooks/useAuthContext";

const snapPoints = ["45%"];

export default function ProfileSettings() {
  const { theme } = useThemeContext();
  const { logOut } = useAuthContext();
  const { navigateTo, replaceStackWith } = useNavigationContext();

  const { bottomSheetModalRef, closeModal } = useProfileContext();
  const Backdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  const settings = [
    {
      title: "Settings and Privacy",
      onClick: () => {
        closeModal();
        navigateTo({ page: "Settings" });
      },
    },
    { title: "Help", onClick: () => console.log("Help") },
    {
      title: "Report a Problem",
      onClick: () => console.log("Report a Problem"),
    },
    {
      title: "Log Out",
      onClick: () => {
        logOut();
        replaceStackWith("AuthenticationGroup");
      },
    },
  ];

  return (
    <BottomSheetModal
      enablePanDownToClose={true}
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={Backdrop}
      handleIndicatorStyle={{ backgroundColor: "grey" }} // todo change this to use theme
      backgroundStyle={{
        borderRadius: 20,
        backgroundColor: theme.colors.tertiary,
      }} // play around with the number to find a suitable one
    >
      <View style={styles.contentContainer}>
        {settings.map((setting, i) => (
          <TouchableOpacity key={i} onPress={setting.onClick}>
            <View
              style={[
                styles.settingContainer,
                {
                  borderBottomColor: theme.colors.backdrop,
                },
              ]}
            >
              <Text style={[styles.settingText, { color: theme.colors.text }]}>
                {setting.title}
              </Text>
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
