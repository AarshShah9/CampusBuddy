import { View, Text, ScrollView, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useLayoutEffect } from 'react';
import { ThemedText } from '~/components/ThemedComponents';
import { AntDesign } from "@expo/vector-icons";
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
                <View style={{height: "10%", width: "100%", backgroundColor:"white", flexDirection:'row', justifyContent:"space-between" }}>
                    <EDetails>
                        <Text>Event</Text>
                        <Text>Date</Text>
                        <Text>Location</Text>
                    </EDetails>
                    <EClubDetails>
                        <Text>LOGO</Text>
                        <Text>CLUB NAME</Text>
                    </EClubDetails>
                </View>
                <ScrollView style={{backgroundColor:"white",borderTopWidth:1, marginBottom:20, marginLeft:10, marginRight:10,}}>
                    <Text style={{marginTop:10,}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ipsum nibh, dignissim nec felis id, dictum aliquet augue. Mauris quis nunc ligula. Integer tristique fringilla risus ac fringilla. Maecenas vitae magna dignissim, tempus nisl a, porttitor diam. Vivamus a quam iaculis, ultricies sem vitae, scelerisque diam. Vivamus ultricies, ipsum ornare congue tincidunt, odio magna hendrerit justo, a maximus libero diam eu mauris. Vivamus sit amet ipsum finibus, ornare orci eget, porttitor sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam a pellentesque urna. Etiam pharetra quis nulla in gravida. Nunc mattis faucibus lorem, id convallis nisl faucibus a. In rutrum dui eget sodales fermentum.

                    Morbi placerat, velit at fermentum ornare, felis nisl pharetra quam, at blandit velit tellus sit amet nulla. Donec ligula ipsum, iaculis id velit consectetur, varius dapibus elit. Morbi eleifend risus mattis felis fringilla, at elementum massa mattis. Praesent id pellentesque elit. Phasellus id justo lorem. Aliquam posuere pharetra mattis. Proin nec lectus in felis ultrices accumsan.

                    Donec pharetra nulla nec est sagittis rhoncus. Nulla vitae urna nec lectus pretium molestie. In hac habitasse platea dictumst. Sed sed arcu sit amet magna pretium placerat sed ut elit. Fusce sem ipsum, maximus et velit at, posuere tincidunt augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam nibh tellus, ultrices nec euismod a, vestibulum sed nisi. Sed in metus porttitor, molestie odio ac, sollicitudin dolor.

                    Mauris nec viverra enim. Phasellus lobortis orci purus, quis volutpat turpis ultricies in. Vivamus suscipit nunc eu maximus elementum. Aenean consequat justo non massa fermentum commodo. Integer bibendum placerat metus, eget iaculis leo congue eu. Donec sagittis sapien lorem, id ullamcorper odio molestie quis. Ut mattis, purus sit amet mollis malesuada, ligula dolor rutrum mauris, sed rutrum metus mauris in dolor. Sed ut ullamcorper massa, eu imperdiet dui. Sed feugiat nisi urna, sed sodales lacus feugiat accumsan. Maecenas sollicitudin diam nibh, in aliquet tortor feugiat venenatis. In porta, eros vel lacinia blandit, nisl sem gravida sem, vitae ultricies enim sapien vel nisi. Quisque consequat tellus quis arcu malesuada varius. Cras a ornare mauris, ut congue nisl. Aliquam laoreet a tortor a facilisis. Sed porttitor tempus tellus quis facilisis. Nulla efficitur leo erat, eget convallis quam pulvinar eu.

                    Donec feugiat lacinia nibh iaculis laoreet. Nullam quis felis eget nisl ultrices molestie. Fusce cursus, nisi eget sagittis gravida, ipsum ante pulvinar lectus, id fermentum nisl felis eu mi. Proin vitae fermentum libero, ut sollicitudin tortor. Sed ac neque id felis blandit fringilla vel vel est. Nam nibh neque, pretium in augue vel, dictum egestas nisl. Curabitur venenatis, velit non scelerisque blandit, nisi neque sodales enim, non accumsan quam nulla a leo.
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
    flex-direction: column;
    margin-left: 10px;
    margin-top:5px;
    margin-bottom:5px;
    justify-content:space-between

`;
const EClubDetails = styled(View)`
    flex-direction: column;
    margin-right: 10px;
    margin-top:5px;
    margin-bottom:5px;
    justify-content:space-evenly
`;