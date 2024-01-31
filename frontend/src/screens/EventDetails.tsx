import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect, useState } from 'react';
import { ThemedText } from '~/components/ThemedComponents';
import { AntDesign, Feather  } from "@expo/vector-icons";
import styled from 'styled-components';

export default function EventDetails() {
    // const { setOptions: setNavigationOptions } = useNavigation();
    // const { params: { eventNumber } } = useRoute<any>();
    const [eventData,setEventData] = useState({
        title:"",
        date:"",
        location:"",
        mainImg:"",
        clubIcon:"",
        clubName:"",
        detail:""
    });
    useLayoutEffect(() => {
        // setNavigationOptions({
        //     headerTitle: `Mock Event ${eventNumber}`
        // })
        // Fetch here?
        setEventData({
            title:"Valorant Tournament",
            date: "January 20",
            location: "University of Calgary",
            mainImg: "",
            clubIcon: "",
            clubName: "E-Sports Club",
            detail: "Step into the exhilarating realm of competition and showcase your tactical prowess at our upcoming local Valorant tournament! Embark on a thrilling journey where precision meets strategy, as teams battle it out for glory and recognition. Unleash your skills in this adrenaline-fueled arena, where every shot fired and every well-executed strategy could be the turning point in your team's ascent to victory. \n Join fellow enthusiasts in a celebration of camaraderie and sportsmanship, and let the electrifying atmosphere of the tournament propel you to new heights. Whether you're a seasoned veteran or a rising star, this is your chance to leave your mark and etch your name in the annals of local Valorant history.\n The stage is set, the competition is fierce, and the glory awaits—seize the opportunity and be part of an unforgettable gaming experience!"
        })
    }, [])
    const navigation = useNavigation<any>();
    
    return (
        <MainContainer>
            <HeaderContainer>
            <AntDesign
                        style={{ marginTop: "10%", marginLeft: "3%" }}
                        name="caretleft"
                        size={24}
                        color="white"
                        onPress={() => {navigation.navigate("Login")}}
                    />
            </HeaderContainer>
            <OverlayContainer>
                <Image
                    style={{height: "35%", width: "100%", backgroundColor:"red"}}
                    source={require("../../assets/Campus_Buddy_Logo.png")}
                />
                <View style={{height: "15%", width: "100%", backgroundColor:"white", flexDirection:'row', justifyContent:"space-between" }}>
                    <EDetails>
                        <Text style={{fontFamily:"Roboto-Medium", fontSize:16, marginBottom:5}}>{eventData.title}</Text>
                        <Text style={{fontFamily:"Roboto-Medium", fontSize:16, marginBottom:5}}>{eventData.date}</Text>
                        <TagContainer>
                            <Feather name="map-pin" size={12} color="black" style={{marginRight:5}}/>
                            <Text style={{fontFamily:"Roboto-Medium", fontSize:10}}>{eventData.location}</Text>
                        </TagContainer>
                        
                    </EDetails>
                    <EClubDetails>
                        <Image 
                            style={{height: 30, width:30, backgroundColor:"red", borderRadius:90,marginBottom:5}}
                            source={require("../../assets/Campus_Buddy_Logo.png")}
                        />
                        <Text style={{fontFamily:"Roboto-Medium", fontSize:18}}>{eventData.clubName}</Text>
                    </EClubDetails>
                </View>
                <ScrollView style={{backgroundColor:"white", borderTopWidth:1, width:"95%", borderTopColor:"#B0CFFF", marginBottom:20}}>
                    <Text style={{marginTop:10, fontFamily:"Roboto-Reg",fontSize:16}}>
                        {eventData.detail}
                    </Text>
                </ScrollView>
            </OverlayContainer>

        </MainContainer>
    )
}

const MainContainer = styled(View)`
  height: 100%;
  background-color: #3a86ff;
`;

const HeaderContainer = styled(View)`
  width: 100%;
  height: 15%;
  justify-content: center;
`;
const OverlayContainer = styled(View)`
    alignItems: center;
    height: 85%;
    width: 100%;
    background-color: white;
`;
const EDetails = styled(View)`
    margin-left: 10px;
    margin-top:20px;

`;
const EClubDetails = styled(View)`
    margin-right: 10px;
    margin-top:25px;
    align-items:center;
`;
const TagContainer = styled(View)`
    background-color: #B0CFFF;
    width: 90%;
    border-radius: 8px;
    flex-direction: row;
    padding:5px;
`