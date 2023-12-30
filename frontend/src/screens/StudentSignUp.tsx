import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import InputField from "~/components/InputField";
import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";

export default function StudentSignUp() {
    const {theme} = useThemeContext();
    return(
        <MainContainer>

        </MainContainer>
    ) 
}

// Component
const MainContainer = styled(View)`
    height:100%;
    background-color: #3A86FF;

`