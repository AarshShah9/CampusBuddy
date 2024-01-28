import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { ThemedText } from '~/components/ThemedComponents';
import { AntDesign, Feather  } from "@expo/vector-icons";
import styled from 'styled-components';

export default function EventDetails() {
    // const { setOptions: setNavigationOptions } = useNavigation();
    // const { params: { eventNumber } } = useRoute<any>();
    // useLayoutEffect(() => {
    //     setNavigationOptions({
    //         headerTitle: `Mock Event ${eventNumber}`
    //     })
    // }, [])
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
                        <Text style={{fontFamily:"Roboto-Reg", fontSize:16, marginBottom:5}}>Event</Text>
                        <Text style={{fontFamily:"Roboto-Reg", fontSize:16, marginBottom:5}}>Date</Text>
                        <TagContainer>
                            <Feather name="map-pin" size={12} color="black" style={{marginRight:5}}/>
                            <Text style={{fontFamily:"Roboto-Reg", fontSize:10}}>Location</Text>
                        </TagContainer>
                        
                    </EDetails>
                    <EClubDetails>
                        <Image 
                            style={{height: 30, width:30, backgroundColor:"red", borderRadius:90}}
                            source={require("../../assets/Campus_Buddy_Logo.png")}
                        />
                        <Text style={{fontFamily:"Roboto-Reg", fontSize:18}}>CLUB NAME</Text>
                    </EClubDetails>
                </View>
                <ScrollView style={{backgroundColor:"white", borderTopWidth:1, width:"95%", borderTopColor:"#B0CFFF", marginBottom:20}}>
                    <Text style={{marginTop:10,}}>
                        
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
    margin-top:5px;
    margin-bottom:5px;
    justify-content:space-evenly;
    align-items:center;
`;
const TagContainer = styled(View)`
    background-color: #B0CFFF;
    width: 100%;
    border-radius: 8px;
    flex-direction: row;
    padding:5px;
`