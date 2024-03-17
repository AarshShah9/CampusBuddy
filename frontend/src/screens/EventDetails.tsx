import { Image, Text, TouchableOpacity, View } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { AntDesign, Entypo, Feather, Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import useThemeContext from "~/hooks/useThemeContext";
import MapComponentSmall from "~/components/MapComponentSmall";
import LocationChip from "~/components/LocationChip";
import useEventsContext from "~/hooks/useEventsContext";
import { EventDetailsItem } from "~/contexts/eventsContext";

const IMG_HEIGHT = 300;

/**
 * This component is responsible for loading event details based on passed ID.
 */

export default function EventDetails() {
  const { setOptions: setNavigationOptions } = useNavigation();
  const {
    params: { id },
  } = useRoute<any>();
  const { getEventDetails } = useEventsContext();
  const  [eventData, setEventData] = useState<EventDetailsItem[]>();

  useEffect(() => {
    getEventDetails("79bc4af0-c551-11ee-83fd-6f8d6c450910").then((res) => {
      console.log(res);
    });
  }, []);

  //   const [eventData, setEventData] = useState({
  //       title,
  //       date,
  //       location,
  //       mainImg: picture,
  //       clubIcon: "",
  //       clubName,
  //       detail:
  //       attendance: 200,
  //       longitude: -122.4324,
  //       latitude: 37.78825,
  //   });

  // Do something before the screen is mounted
  //   useLayoutEffect(() => {
  //     setNavigationOptions({ headerTitle: `${eventData.title}` });
  //   }, []);

  const [isLiked, setIsLiked] = useState(false);
  const { theme } = useThemeContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);
  const navigation = useNavigation<any>();

  // Function adds the event to users fav list.
  const userLiked = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  const returnPrevPage = useCallback(() => {
    navigation.goBack();
  }, []);

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

  return (
    <MainContainer color={theme.colors.primary}>
      <HeaderContainer>
        <TouchableOpacity onPress={returnPrevPage}>
          <AntDesign name="caretleft" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={userLiked}>
          <Entypo
            name="heart"
            size={28}
            // color={isLiked ? theme.colors.onliked : theme.colors.unLiked}
          />
        </TouchableOpacity>
      </HeaderContainer>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        style={{ height: "100%", backgroundColor: "white" }}
        scrollEventThrottle={16}
      >
        {/* <Animated.Image
          style={[{ height: 250, width: "100%" }, imageAnimatedStyle]}
          source={{ uri: eventData.mainImg }}
        /> */}
        <View
          style={{
            height: 100,
            width: "100%",
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <EDetails>
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              {/* {eventData.title} */}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              {/* {eventData.date} */}
            </Text>
            {/* <LocationChip location={eventData.location} /> */}
          </EDetails>
          <EClubDetails>
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
            <Text style={{ fontFamily: "Roboto-Medium", fontSize: 18 }}>
              {/* {eventData.clubName} */}
            </Text>
          </EClubDetails>
        </View>
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
          <Text
            style={{ fontFamily: "Roboto-Medium", fontSize: 16, marginLeft: 5 }}
          >
            {/* Attendance: {eventData.attendance} */}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            borderTopWidth: 1,
            width: "100%",
            borderTopColor: "#B0CFFF",
            paddingBottom: 20,
            paddingLeft: 10,
            paddingRight: 10,
          }}
        >
          <Text
            style={{ marginTop: 10, fontFamily: "Roboto-Reg", fontSize: 16 }}
          >
            {/* {eventData.detail} */}
          </Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          {/* <MapComponentSmall
            latitude={eventData.latitude}
            longitude={eventData.longitude}
          /> */}
        </View>
        <View
          style={{
            paddingBottom: 60,
            marginLeft: "auto",
            marginRight: "auto",
            width: "80%",
          }}
        >
          <StyledButton mode="contained">
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
          </StyledButton>
        </View>
      </Animated.ScrollView>
    </MainContainer>
  );
}

// prettier-ignore
const MainContainer = styled(View) <{ color: string }>`
    height: 100%;
    background-color: ${(props) => props.color};
`;
// prettier-ignore
const HeaderContainer = styled(View)`
    width: 100%;
    height: 60px; /* TODO this should be consistent across the app */
    justify-content: space-between;
    padding: 0 20px;
    flex-direction: row;
    align-items: center
`;
// prettier-ignore
const EDetails = styled(View)`
    margin-left: 10px;
    margin-top: 20px;
`;
// prettier-ignore
const EClubDetails = styled(View)`
    margin-right: 10px;
    margin-top: 25px;
    align-items: center;
`;
// prettier-ignore
const TagContainer = styled(View)`
    background-color: #b0cfff;
    width: 90%;
    border-radius: 8px;
    flex-direction: row;
    padding: 5px;
    margin-bottom: 5px;
`;
// prettier-ignore
const StyledButton = styled(Button)`
    border-radius: 8px;
    width: 100%;
    height: 48px;
    font-size: 25px;
    font-weight: bold;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
    justify-content: center;
`;
