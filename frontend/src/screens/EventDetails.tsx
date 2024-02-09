import { View, Text, Image} from "react-native";
import {Button} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { AntDesign, Feather, Entypo, Ionicons } from "@expo/vector-icons";
import styled from "styled-components";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import useThemeContext from "~/hooks/useThemeContext";

const IMG_HEIGHT = 300;

/**
 * This component is responsible for loading event details based on passed ID.
 */

export default function EventDetails() {
  const [isLiked, setIsLiked] = useState(false);
  const { theme } = useThemeContext();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffSet = useScrollViewOffset(scrollRef);

  // Function adds the event to users fav list.
  const userLiked = useCallback(() => {
    setIsLiked(!isLiked);
  }, [isLiked]);

  const returnPrevPage = useCallback(() => {
    navigation.navigate("Login");
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
  // const { setOptions: setNavigationOptions } = useNavigation();
  // const { params: { eventNumber } } = useRoute<any>();

  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    mainImg: "",
    clubIcon: "",
    clubName: "",
    detail: "",
    attendance: 0,
  });
  // Fetch event details from backend
  useLayoutEffect(() => {
    // setNavigationOptions({
    //     headerTitle: `Mock Event ${eventNumber}`
    // })
    setEventData({
      title: "Valorant Tournament",
      date: "January 20",
      location: "University of Calgary",
      mainImg: "",
      clubIcon: "",
      clubName: "E-Sports Club",
      detail:
        "Step into the exhilarating realm of competition and showcase your tactical prowess at our upcoming local Valorant tournament! Embark on a thrilling journey where precision meets strategy, as teams battle it out for glory and recognition. Unleash your skills in this adrenaline-fueled arena, where every shot fired and every well-executed strategy could be the turning point in your team's ascent to victory. \n Join fellow enthusiasts in a celebration of camaraderie and sportsmanship, and let the electrifying atmosphere of the tournament propel you to new heights. Whether you're a seasoned veteran or a rising star, this is your chance to leave your mark and etch your name in the annals of local Valorant history.\n The stage is set, the competition is fierce, and the glory awaits—seize the opportunity and be part of an unforgettable gaming experience!",
      attendance: 200,
    });
  }, []);
  const navigation = useNavigation<any>();

  return (
    <MainContainer color={theme.colors.primary}>
      <HeaderContainer>
        <AntDesign
          style={{ marginTop: "15%", marginLeft: "3%" }}
          name="caretleft"
          size={24}
          color="white"
          onPress={returnPrevPage}
        />
        <Entypo
          style={{ marginTop: "15%", marginRight: "5%" }}
          name="heart"
          size={28}
          color={isLiked ? theme.colors.onliked : theme.colors.unLiked }
          onPress={userLiked}
        />
      </HeaderContainer>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollRef}
        style={{ height: "100%", backgroundColor: "white" }}
        scrollEventThrottle={16}
      >
        <Animated.Image
          style={[
            { height: 250, width: "100%", backgroundColor: "red" },
            imageAnimatedStyle,
          ]}
          source={require("../../assets/Campus_Buddy_Logo.png")}
        />

        <View
          style={{
            height: "10%",
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
              {eventData.title}
            </Text>
            <Text
              style={{
                fontFamily: "Roboto-Medium",
                fontSize: 16,
                marginBottom: 5,
              }}
            >
              {eventData.date}
            </Text>
            <TagContainer>
              <Feather
                name="map-pin"
                size={12}
                color="black"
                style={{ marginRight: 5 }}
              />
              <Text style={{ fontFamily: "Roboto-Medium", fontSize: 10 }}>
                {eventData.location}
              </Text>
            </TagContainer>
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
              source={require("../../assets/Campus_Buddy_Logo.png")}
            />
            <Text style={{ fontFamily: "Roboto-Medium", fontSize: 18 }}>
              {eventData.clubName}
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
            Attendance: {eventData.attendance}
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
            {eventData.detail} + {eventData.detail}
          </Text>
        </View>
        <View style={{paddingBottom:60,marginLeft:'auto', marginRight:'auto', width:'80%'}}>
            <StyledButton
              mode="contained"
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
                Login
              </Text>
            </StyledButton>
        </View>
      </Animated.ScrollView>
    </MainContainer>
  );
}

const MainContainer = styled(View)<{color:string}>`
  height: 100%;
  background-color: ${(props) => props.color};
`;

const HeaderContainer = styled(View)`
  width: 100%;
  height: 13%;
  justify-content: space-between;
  flex-direction: row;
`;

const EDetails = styled(View)`
  margin-left: 10px;
  margin-top: 20px;
`;
const EClubDetails = styled(View)`
  margin-right: 10px;
  margin-top: 25px;
  align-items: center;
`;
const TagContainer = styled(View)`
  background-color: #b0cfff;
  width: 90%;
  border-radius: 8px;
  flex-direction: row;
  padding: 5px;
  marginbottom: 5px;
`;
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