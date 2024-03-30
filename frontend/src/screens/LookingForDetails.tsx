import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import { useCallback } from "react";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
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
import { services } from "~/mockData/ServicesData";

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
        <Entypo
          name="heart"
          size={28}
          color="white" // TODO use theme context
        />
      </View>
      <View style={[{ backgroundColor: theme.colors.onPrimary }]}>
        {/* Here will go the View for the title  */}
        <View style={styles.titleContainer}>
          <Text
            style={{
              fontFamily: "Roboto-Medium",
              fontSize: 16,
              marginBottom: 4,
              // Need to add Text Color Change
            }}
          >
            Title Text
          </Text>
          <Text
            style={{
              fontFamily: "Nunito",
              fontSize: 12,
              marginBottom: 8,
            }}
          >
            Date
          </Text>
          <LocationChip location="Location if Relevant :D " />
        </View>

        {/* looking for description  Section */}
        <View style={styles.contentContainer}>
          <View style={styles.textContainer}>
            <Text
              style={{
                marginBottom: 8,
                fontFamily: "Roboto",
                fontSize: 16,
              }}
            >
              This is for the Description
            </Text>
          </View>

          {/* Attending and comments Chip */}
          <View style={styles.chipContainer}>
            <PersonChip numberOfUsers={5} />
            <TouchableOpacity>
              <CommentsChip />
            </TouchableOpacity>
          </View>
          {/* Join Button */}
          <TouchableOpacity>
            <Button style={styles.joinButton} mode="contained">
              Join
            </Button>
          </TouchableOpacity>
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
    borderBottomColor: "black",
  },
  contentContainer: {
    marginLeft: 16,
    marginRight: 16,
  },
  textContainer: {
    paddingHorizontal: 16,
  },
  chipContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopStyle: "solid",
    borderTopColor: "black",
  },
  joinButton: {
    marginVertical: 16,
  },
});
