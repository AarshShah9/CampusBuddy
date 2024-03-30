import React from "react";
import { View, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";
import useThemeContext from "~/hooks/useThemeContext";
import CommentsBar from "~/components/CommentsBar";

export default function LookingForDetails() {
  const { theme, inDarkMode } = useThemeContext();

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.colors.onPrimary }, // Color incorrect for dark mode
      ]}
    >
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <Entypo name="chevron-left" size={28} color="white" />
      </View>
      <View style={[{ backgroundColor: theme.colors.onPrimary }]}>
      </View>
      {/* Main Container */}
      <CommentsBar />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
  },
  headerContainer: {
    width: "100%",
    height: 88,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
});
