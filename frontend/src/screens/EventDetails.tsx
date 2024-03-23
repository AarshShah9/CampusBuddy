import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
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
import LoadingSkeleton from "~/components/LoadingSkeleton";

const IMG_HEIGHT = 300;

/**
 * This component is responsible for loading event details based on passed ID.
 * */

export default function EventDetails() {
  const {
    params: { id, map },
  } = useRoute<any>();
  const { getEventDetails, likeEvent } = useEventsContext();
  const { theme, inDarkMode } = useThemeContext();
  const navigation = useNavigation<any>();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);

  const { data: eventData, refetch } = useQuery({
    queryKey: ["event-details", id],
    queryFn: () => getEventDetails(id),
  });

  const likeMutation = useMutation({
    mutationFn: async ({
      id,
      previousState,
    }: {
      id: string;
      previousState: boolean;
    }) => {
      await likeEvent(id);
      refetch();
    },
  });

  const onMapPress = useCallback(() => {
    navigation.navigate("MapDetails", {
      eventData: [
        {
          title: eventData?.title,
          description: eventData?.description,
          latitude: eventData?.location.latitude,
          longitude: eventData?.location.longitude,
        },
      ],
    });
  }, [eventData, navigation]); // TODO fix optimistic updates
  const isOptimistic =
    likeMutation.variables &&
    (likeMutation.isPending ? !likeMutation.variables.previousState : false);

  const isLiked = isOptimistic
    ? !likeMutation.variables?.previousState
    : eventData?.isLiked;

  const userLiked = useCallback(() => {
    likeMutation.mutate({ id, previousState: eventData?.isLiked! });
  }, [id, likeEvent, eventData?.isLiked]);

  const returnPrevPage = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffSet.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [3, 1, 1],
          ),
        },
      ],
    };
  });

  const seeAttendees = useCallback(() => {
    navigation.navigate("Attendees", { id });
  }, [navigation, id]);

  return (
    <View
      style={[styles.mainContainer, { backgroundColor: theme.colors.primary }]}
    >
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={returnPrevPage}>
          <AntDesign name="caretleft" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={userLiked}>
          <Entypo
            name="heart"
            size={28}
            color={isLiked ? "red" : "white"} // TODO use theme context
            style={{ opacity: isOptimistic ? 0.5 : 1 }}
          />
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        style={{ height: "100%", backgroundColor: "white" }}
        scrollEventThrottle={16}
      >
        <LoadingSkeleton
          show={!eventData}
          radius="square"
          width={"100%"}
          height={250}
        >
          <Animated.Image
            style={[{ height: 250, width: "100%" }, imageAnimatedStyle]}
            source={{ uri: eventData?.image }}
          />
        </LoadingSkeleton>
        <View
          style={{
            height: 100,
            width: "100%",
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.eDetails}>
            <LoadingSkeleton show={!eventData} width={180} height={16}>
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  fontSize: 16,
                  marginBottom: 5,
                }}
              >
                {eventData?.title}
              </Text>
            </LoadingSkeleton>
            <LoadingSkeleton show={!eventData} width={150} height={16}>
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  fontSize: 16,
                  marginBottom: 5,
                }}
              >
                {convertUTCToTimeAndDate(eventData?.startTime)}
              </Text>
            </LoadingSkeleton>
            <LoadingSkeleton show={!eventData} width={120} height={16}>
              {eventData?.location.name && (
                <LocationChip location={eventData?.location.name} />
              )}
            </LoadingSkeleton>
          </View>
          <View style={styles.eClubDetails}>
            <Image
              style={{
                height: 30,
                width: 30,
                backgroundColor: "red",
                borderRadius: 90,
                marginBottom: 5,
              }}
              source={require("~/assets/Campus_Buddy_Logo.png")}
            />
            <LoadingSkeleton show={!eventData} width={60} height={16}>
              <Text style={{ fontFamily: "Roboto-Medium", fontSize: 18 }}>
                {eventData?.organization?.organizationName}
              </Text>
            </LoadingSkeleton>
          </View>
        </View>
        <TouchableOpacity onPress={seeAttendees}>
          <View
            style={{
              borderTopColor: "#B0CFFF",
              borderTopWidth: 1,
              flexDirection: "row",
              height: 50,
              backgroundColor: "white",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="people-outline"
              size={30}
              color="black"
              style={{ marginLeft: 10 }}
            />
            <LoadingSkeleton show={!eventData} width={120} height={16}>
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  fontSize: 16,
                  marginLeft: 5,
                }}
              >
                Attendance: {eventData?.eventResponses.length}{" "}
              </Text>
            </LoadingSkeleton>
          </View>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: "white",
            borderTopWidth: 1,
            width: "100%",
            borderTopColor: "#B0CFFF",
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
          }}
        >
          <LoadingSkeleton show={!eventData} width={"100%"} height={30}>
            <Text
              style={{ marginTop: 10, fontFamily: "Roboto-Reg", fontSize: 16 }}
            >
              {eventData?.description}
            </Text>
          </LoadingSkeleton>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {eventData?.location && (map === undefined ? true : map) && (
            <TouchableOpacity onPress={onMapPress}>
              <MapComponentSmall
                latitude={eventData?.location.latitude}
                longitude={eventData?.location.longitude}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            paddingBottom: 60,
            marginLeft: "auto",
            marginRight: "auto",
            width: "90%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button style={styles.attendButton} mode="contained">
            <Text
              style={{
                lineHeight: 30,
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
                fontFamily: "Nunito-Bold",
              }}
            >
              Attend
            </Text>
          </Button>
        </View>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
  },
  headerContainer: {
    width: "100%",
    height: 60, // TODO this should be consistent across the app
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  eDetails: {
    marginLeft: 10,
    marginTop: 20,
  },
  eClubDetails: {
    marginRight: 10,
    marginTop: 25,
    alignItems: "center",
  },
  attendButton: {
    borderRadius: 8,
    width: "100%",
    height: 48,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    justifyContent: "center",
  },
});
