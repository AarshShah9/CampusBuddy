import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from "react-native";
import useProfileContext from "~/hooks/useProfileContext";
import { Entypo, Ionicons } from "@expo/vector-icons";
import useThemeContext from "~/hooks/useThemeContext";
import useNavigationContext from "~/hooks/useNavigationContext";
import useAuthContext from "~/hooks/useAuthContext";
import useEventsContext from "~/hooks/useEventsContext";
import { likeEvent } from "~/lib/apiFunctions/Events";
import { useMutation } from "@tanstack/react-query";

const snapPoints = ["50%"];

export default function EventSettings() {
  const { theme } = useThemeContext();
  const { userType } = useAuthContext();
  const { navigateTo, navigateBack } = useNavigationContext();

  const { bottomSheetModalRef, closeModal, likeMutate, eventData } =
    useEventsContext();

  const Backdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  const onDelete = useCallback(() => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: async () => {
          navigateBack();
        },
      },
    ]);
  }, []);

  const settings = [
    {
      title: "Like",
      icon: (
        <Entypo
          name="heart"
          size={28}
          color={"red"}
          // color={eventData && eventData?.isLiked ? "red" : "white"}
        />
      ),
      onClick: () => {
        likeMutate();
      },
    },
    {
      title: "Edit",
      icon: <Ionicons name="create-outline" size={24} color={"black"} />,
      onClick: () => {
        Alert.alert("Coming Soon", "This feature is not yet available.");
      },
    },
    {
      title: "Delete",
      icon: <Ionicons name="trash-outline" size={24} color={"black"} />,
      onClick: () => {
        Alert.alert("Coming Soon", "This feature is not yet available.");
      },
    },
    {
      title: "Make Public",
      icon: <Ionicons name="earth-outline" size={24} color={"black"} />,
      onClick: () => {
        Alert.alert("Coming Soon", "This feature is not yet available.");
      },
    },
    {
      title: "Share",
      icon: <Ionicons name="share-social-outline" size={24} color={"black"} />,
      onClick: () => {
        Alert.alert("Coming Soon", "This feature is not yet available.");
      },
    },
    {
      title: "Report this Event",
      icon: <Ionicons name="flag-outline" size={24} color={"black"} />,
      onClick: () => {
        Alert.alert("Coming Soon", "This feature is not yet available.");
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
      }}
    >
      <View style={styles.contentContainer}>
        {settings.map((setting, i) => (
          <TouchableOpacity key={i} onPress={setting.onClick}>
            <View
              style={[
                styles.settingContainer,
                {
                  borderBottomColor: theme.colors.backdrop,
                  paddingLeft: 12,
                },
              ]}
            >
              {setting.icon}
              <Text
                style={[
                  styles.settingText,
                  { color: theme.colors.text, paddingLeft: 15 },
                ]}
              >
                {setting.title}
              </Text>
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
