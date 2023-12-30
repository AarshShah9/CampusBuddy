import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import InputField from "~/components/InputField";
import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";
import { MainContainer } from "~/components/ThemedComponents";
import { useNavigation } from "@react-navigation/native";

export default function Login() {
  const { theme } = useThemeContext();
  const navigation = useNavigation<any>();

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
        <InputField name="Email" placeholder="Email" />
        <InputField name="Password" placeholder="Password" />
        <StyledButton mode="contained" onPress={() => console.log("Pressed")}>
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
