import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useThemeContext from "~/hooks/useThemeContext";
import useNavigationContext from "~/hooks/useNavigationContext";
import useEventsContext from "~/hooks/useEventsContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "~/lib/apiFunctions/Profile";
import useAuthContext from "~/hooks/useAuthContext";

export default function ItemSettings() {
  const { theme } = useThemeContext();
  const { navigateBack } = useNavigationContext();
  const queryClient = useQueryClient();

  const { bottomSheetItemModalRef, item, closeModal } = useEventsContext();
  const { user } = useAuthContext();

  const Backdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />
    ),
    [],
  );

  const deleteMutation = useMutation({
    mutationFn: () => deleteItem(item?.id!),
    onSuccess: () => {
      closeModal();
      navigateBack();
      Alert.alert("Success", "Item deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["search-marketplace-items"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-market", user?.id],
      });
    },
    onError: (err) => {
      Alert.alert("Error", err.message);
    },
  });

  const self = item?.self;
  const isPublic = true;
  const snapPoints = self ? ["50%"] : ["35%"];

  const settings = [
    {
      title: "Edit",
      shown: self,
      icon: <Ionicons name="create-outline" size={24} color={"black"} />,
      onClick: () => {
        Alert.alert("Coming Soon", "This feature is not yet available.");
      },
    },
    {
      title: "Delete",
      shown: self,
      icon: <Ionicons name="trash-outline" size={24} color={"black"} />,
      onClick: () => {
        Alert.alert(
          "Delete Event",
          "Are you sure you want to delete this event?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => {
                deleteMutation.mutate();
              },
            },
          ],
        );
      },
    },
    {
      title: isPublic ? "Make Private" : "Make Public",
      shown: self,
      icon: (
        <Ionicons
          name={isPublic ? "lock-closed-outline" : "lock-open-outline"}
          size={24}
          color={"black"}
        />
      ),
      onClick: () => {
        Alert.alert("Coming Soon", "This feature is not yet available.");
      },
    },
    {
      title: "Share",
      shown: true,
      icon: <Ionicons name="share-social-outline" size={24} color={"black"} />,
      onClick: () => {
        Alert.alert("Coming Soon", "This feature is not yet available.");
      },
    },
    {
      title: "Report this Item",
      shown: true,
      icon: <Ionicons name="flag-outline" size={24} color={"black"} />,
      onClick: () => {
        Alert.alert("Coming Soon", "This feature is not yet available.");
      },
    },
  ];

  return (
    <BottomSheetModal
      enablePanDownToClose={true}
      ref={bottomSheetItemModalRef}
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
            {setting.shown && (
              <TouchableOpacity onPress={setting.onClick}>
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
