import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import useThemeContext from "~/hooks/useThemeContext";
import useEventsContext from "~/hooks/useEventsContext";
import LocationChip from "~/components/LocationChip";
import MapComponentSmall from "~/components/MapComponentSmall";
import { convertUTCToTimeAndDate } from "~/lib/timeFunctions";
import { useMutation, useQuery } from "@tanstack/react-query";
import useNavigationContext from "~/hooks/useNavigationContext";
import LoadingSkeleton from "~/components/LoadingSkeleton";
import PersonChip from "~/components/PersonChip";
import CommentsChip from "~/components/CommentsChip";

/**
 * This component is responsible for loading Looking For Details details based on passed ID.
 * */

export default function LookingForDetails() {
  const { theme, inDarkMode } = useThemeContext();
  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: theme.colors.onPrimary }, // Color incorrect for dark mode
      ]}
    >
      {/* This is the header container */}
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: theme.colors.primary },
        ]}
      >
        <Entypo name="chevron-left" size={28} color="white" />
      </View>
      <View style={[{ backgroundColor: theme.colors.onPrimary }]}>
        {/* Here will go the View for the title  */}
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 16,
              marginBottom: 8,
              // Need to add Text Color Change
            }}
          >
            This is the Sample Title
          </Text>
          <Text
            style={{
              marginBottom: 8,
            }}
          >
            Date
          </Text>
          <LocationChip location="Do we need this?" />
        </View>

        {/* looking for description  */}
        <View style={styles.contentContainer}>
          <Text
            style={{
              marginBottom: 8,
            }}
          >
            This is for the Description
          </Text>

          {/* Attending and comments Chip */}
          <View style={styles.chipContainer}>
            <PersonChip numberOfUsers={5} />
            <CommentsChip />
          </View>
        </View>
      </View>
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
  titleContainer: {
    margin: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor: "black", // This needs to be set to the proper color for the page
  },
  contentContainer: {
    marginLeft: 32,
    marginRight: 32,
  },
  chipContainer: {},
});
