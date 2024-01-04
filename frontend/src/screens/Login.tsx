import { View, Text, StyleSheet, Image, TouchableOpacity, Keyboard } from "react-native";
import { Button } from "react-native-paper";
import InputField from "~/components/InputField";
import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";
import { MainContainer } from "~/components/ThemedComponents";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function Login() {
  const { theme } = useThemeContext();
  const navigation = useNavigation<any>();

  // Testing If Could Reach EndPoints
  const port = 3000;
  const ip = process.env.IP_ADDRESS ?? 'localhost';
  const validate = async () => {
    try{
      console.log('clicked')
      const response = await axios(`http://${ip}:${port}/api/studentTest`)
      console.log(response.data)
      
    }catch{
      console.log("error")
    }
    finally{
      navigation.navigate("DrawerGroup")
    }
  }

  return (
    <MainContainer $primary={theme.colors.primary}>
      <LogoContainer>
        <Image
          style={{ marginTop: 42 }}
          source={require("../../assets/Campus_Buddy_Logo.png")}
        />
      </LogoContainer>
      <OverlayContainer $color={theme.colors.tertiary}>
        <Header>{"Login"}</Header>
        <InputField  name="Email" placeholder="Email" />
        <InputField password={true} name="Password" placeholder="Password" />
        <StyledButton mode="contained" onPress={() => {validate()}}>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
            Login
          </Text>
        </StyledButton>
        <ClickLink $color={theme.colors.primary}>
        Don't have any account?  
        <Text onPress={()=>{navigation.navigate("StudentSignUp")}} style={{ color: theme.colors.primary }}> Sign up</Text>
        </ClickLink>
      </OverlayContainer>
    </MainContainer>
  );
}

const LogoContainer = styled(View)`
  height: 28%;
  align-items: center;
  justify-content: center;
`;
const OverlayContainer = styled(View)<{ $color: string }>`
  height: 74%;
  width: 100%;
  border-top-left-radius: 76px;
  border-width:0s;
  background-color: ${(props) => props.$color};
`;
const ClickLink = styled(Text)<{ $color: string }>`
  margin-left: auto;
  margin-right: auto;
  margin-top: 64px;
  font-size: 16px;
`;
const Header = styled(Text)`
  font-size: 40px;
  font-weight: bold;
  margin-top: 64px;
  margin-bottom: 32px;
  margin-left: auto;
  margin-right: auto;
`;
const StyledButton = styled(Button)`
  width: 84%;
  height: 10%;
  font-size: 25px;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  margin-top:2%;
  justify-content: center;
`;
