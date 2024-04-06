import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import {
  NavigationProp,
  ParamListBase,
  useRoute,
} from "@react-navigation/native";
import { useCallback, useEffect, useLayoutEffect } from "react";
import { Entypo, Ionicons } from "@expo/vector-icons";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import useThemeContext from "~/hooks/useThemeContext";
import LocationChip from "~/components/LocationChip";
import MapComponentSmall from "~/components/MapComponentSmall";
import { convertUTCToTimeAndDate } from "~/lib/timeFunctions";
import { useMutation } from "@tanstack/react-query";
import { generateImageURL } from "~/lib/CDNFunctions";
import useNavigationContext from "~/hooks/useNavigationContext";
import LoadingSkeleton from "~/components/LoadingSkeleton";
import { attendEvent } from "~/lib/apiFunctions/Events";
import useEventsContext from "~/hooks/useEventsContext";

const IMG_HEIGHT = 300;

/**
 * This component is responsible for loading event details based on passed ID.
 * */

export type EventDetailsType = {
  id: string;
  title: string;
  self: boolean;
  description: string;
  isFlagged: boolean;
  location: {
    latitude: number;
    longitude: number;
    name: string;
  };
  organization: {
    organizationName: string;
    organizationId: string;
    organizationImage: string;
  };
  startTime: string;
  image: string;
  attendees: number;
  isAttending: boolean;
  isLiked: boolean;
  userName: string;
  userId: string;
  userImage: string;
  eventType: "NonVerified" | "Verified";
  isPublic: boolean;
};

export default function EventDetails({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const {
    params: { id, map = true },
  } = useRoute<any>();
  const { theme } = useThemeContext();
  const { navigateTo } = useNavigationContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);
  const { openModal, eventData, fetchEventDetails, refetchEventDetails } =
    useEventsContext();

  useEffect(() => {
    fetchEventDetails(id);
  }, [id, fetchEventDetails]);

  const attendMutation = useMutation({
    mutationFn: async ({
      id,
      previousState,
    }: {
      id: string;
      previousState: boolean;
    }) => {
      await attendEvent(id);
      refetchEventDetails();
    },
  });

  const onMapPress = useCallback(() => {
    if (eventData) {
      navigateTo({
        page: "MapDetails",
        eventData: [
          {
            title: eventData.title,
            description: eventData.description,
            latitude: eventData.location.latitude,
            longitude: eventData.location.longitude,
          },
        ],
      });
    }
  }, [eventData]);

  const userAttendEvent = useCallback(() => {
    attendMutation.mutate({
      id,
      previousState: eventData?.isAttending!,
    });
  }, [id, attendEvent, eventData?.isAttending]);

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
    navigateTo({ page: "Attendees", id });
  }, [id]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => openModal(id)}>
          <Entypo name="dots-three-horizontal" size={24} color="white" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  if (eventData && eventData.isFlagged) {
    Alert.alert(
      "Under Review",
      "This item has been flagged as it may not meet our guidelines. Please contact us if you have any questions.",
    );
  }

  const viewCreator = useCallback(() => {
    if (eventData?.eventType === "Verified") {
      navigateTo({
        page: "OrganizationProfile",
        id: eventData?.organization.organizationId,
      });
    } else {
      navigateTo({ page: "UserProfile", id: eventData?.userId! });
    }
  }, [
    eventData?.eventType,
    eventData?.organization.organizationId,
    eventData?.userId,
  ]);

  return (
    <View style={[styles.mainContainer]}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        style={{ height: "100%", backgroundColor: theme.colors.tertiary }}
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
            source={{ uri: generateImageURL(eventData?.image) }}
          />
        </LoadingSkeleton>
        <View
          style={{
            height: 100,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: theme.colors.tertiary,
          }}
        >
          <View style={styles.eDetails}>
            <LoadingSkeleton show={!eventData} width={180} height={16}>
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  fontSize: 16,
                  marginBottom: 5,
                  color: theme.colors.text,
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
                  color: theme.colors.text,
                }}
              >
                {convertUTCToTimeAndDate(eventData?.startTime)}
              </Text>
            </LoadingSkeleton>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            >
              <LoadingSkeleton show={!eventData} width={80} height={16}>
                {eventData?.location.name && (
                  <LocationChip location={eventData?.location.name} />
                )}
              </LoadingSkeleton>
              <LoadingSkeleton show={!eventData} width={30} height={16}>
                <>
                  {eventData?.isLiked && (
                    <Ionicons
                      name="heart"
                      size={20}
                      color={"red"}
                      style={{ paddingLeft: 6 }}
                    />
                  )}
                </>
              </LoadingSkeleton>
            </View>
          </View>
          <TouchableOpacity onPress={viewCreator}>
            <View style={styles.eClubDetails}>
              <Image
                style={{
                  height: 30,
                  width: 30,
                  backgroundColor: "grey",
                  borderRadius: 90,
                  marginBottom: 5,
                }}
                source={{
                  uri:
                    eventData?.eventType === "Verified"
                      ? generateImageURL(
                          eventData?.organization?.organizationImage,
                        )
                      : generateImageURL(eventData?.userImage),
                }}
              />
              <LoadingSkeleton show={!eventData} width={60} height={16}>
                <Text
                  style={{
                    fontFamily: "Roboto-Medium",
                    fontSize: 18,
                    color: theme.colors.text,
                  }}
                >
                  {eventData?.eventType === "Verified"
                    ? eventData?.organization?.organizationName
                    : eventData?.userName}
                </Text>
              </LoadingSkeleton>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={seeAttendees}>
          <View
            style={{
              borderTopColor: "#B0CFFF",
              borderTopWidth: 1,
              flexDirection: "row",
              height: 50,
              alignItems: "center",
              backgroundColor: theme.colors.tertiary,
            }}
          >
            <Ionicons
              name="people-outline"
              size={30}
              color={theme.colors.text}
              style={{ marginLeft: 10 }}
            />
            <LoadingSkeleton show={!eventData} width={120} height={16}>
              <Text
                style={{
                  fontFamily: "Roboto-Medium",
                  fontSize: 16,
                  marginLeft: 5,
                  color: theme.colors.text,
                }}
              >
                Attendance: {eventData?.attendees}{" "}
              </Text>
            </LoadingSkeleton>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderTopWidth: 1,
            width: "100%",
            borderTopColor: "#B0CFFF",
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            backgroundColor: theme.colors.tertiary,
          }}
        >
          <LoadingSkeleton show={!eventData} width={"100%"} height={30}>
            <Text
              style={{
                marginTop: 10,
                fontFamily: "Roboto-Reg",
                fontSize: 16,
                color: theme.colors.text,
              }}
            >
              {eventData?.description}
            </Text>
          </LoadingSkeleton>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.tertiary,
          }}
        >
          {eventData?.location && map && (
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
            width: "100%",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.tertiary,
          }}
        >
          <Button
            style={styles.attendButton}
            mode="contained"
            onPress={userAttendEvent}
          >
            <Text
              style={{
                lineHeight: 30,
                fontSize: 24,
                fontWeight: "bold",
                color: "white",
                fontFamily: "Nunito-Bold",
              }}
            >
              {eventData?.isAttending ? "Not Going" : "Attend"}
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
    height: 40, // TODO this should be consistent across the app
    justifyContent: "space-between",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "flex-start",
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
    width: "90%",
    height: 48,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    justifyContent: "center",
  },
});
