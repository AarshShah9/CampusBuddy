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
  Alert,
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
  const { userType } = useAuthContext();

  const { bottomSheetModalRef, closeModal } = useProfileContext();
  const Backdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  const settings = [
    {
      title: "Interests",
      onClick: () => {
        closeModal();
        navigateTo({ page: "Interests" });
      },
      show: userType === "Student",
    },
    {
      title: "Settings and Privacy",
      onClick: () => {
        closeModal();
        navigateTo({
          page: userType === "Student" ? "Settings" : "OrganizationSettings",
        });
      },
      show: true,
    },
    {
      title: "Analytics",
      onClick: () => {
        closeModal();
        navigateTo({ page: "Analytics" });
      },
      show: userType === "Organization_Admin",
    },
    {
      title: "Help",
      onClick: () => {
        closeModal();
        navigateTo({ page: "Help" });
      },
      show: true,
    },
    {
      title: "Report a Problem",
      onClick: () => {
        Alert.alert("Coming Soon", "This feature is not yet available.");
      },
      show: true,
    },
    {
      title: "Log Out",
      onClick: () => {
        logOut();
        replaceStackWith("AuthenticationGroup");
      },
      show: true,
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
      }}
    >
      <View style={styles.contentContainer}>
        {settings.map((setting, i) => (
          <View key={i}>
            {setting.show && (
              <TouchableOpacity onPress={setting.onClick}>
                <View
                  style={[
                    styles.settingContainer,
                    {
                      borderBottomColor: theme.colors.backdrop,
                    },
                  ]}
                >
                  <Text
                    style={[styles.settingText, { color: theme.colors.text }]}
                  >
                    {setting.title}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={"#3a86ff"}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
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
