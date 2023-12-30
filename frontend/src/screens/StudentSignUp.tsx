import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "react-native-paper";
import InputField from "~/components/InputField";
import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";

export default function StudentSignUp() {
  const { theme } = useThemeContext();
  return (
    <MainContainer>
      <HeaderContainer>
        <HeaderText $textColor={theme.colors.tertiary}>
          Student Sign Up
        </HeaderText>
      </HeaderContainer>
      <OverlayContainer $color={theme.colors.tertiary}>
        <FormContainer>
          <InputField
            name="Institution Email"
            placeholder="example@ucalgary.com"
          />
          <InputField name="Institution Name" placeholder="Institution Name" />
          <InputField name="First Name" placeholder="" />
          <InputField name="Last Name" placeholder="" />
          <StyledButton mode="contained" onPress={() => console.log("Pressed")}>
            <Text style={{ fontSize: 20, fontWeight: "bold", color: "white" }}>
              Next
            </Text>
          </StyledButton>
          <ClickLink $color={theme.colors.primary}>
            Sign up as an Organization 
            <Text onPress={()=>{console.log("Pressed")}} style={{ color: theme.colors.primary,fontSize:16}}> here </Text>
          </ClickLink>
           
        </FormContainer>
      </OverlayContainer>
    </MainContainer>
  );
}

// Component
const MainContainer = styled(View)`
  height: 100%;
  background-color: #3a86ff;
`;
const OverlayContainer = styled(View)<{ $color: string }>`
  height: 85%;
  width: 100%;
  border-top-left-radius: 76px;
  background-color: ${(props) => props.$color};
`;
const HeaderContainer = styled(View)`
  width: 100%;
  height: 15%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const HeaderText = styled(Text)<{ $textColor: string }>`
  margin: 32px auto 0px auto;
  color: ${(props) => props.$textColor};
  font-size: 28px;
  font-weight: bold;
`;
const GoBackText = styled(Text)<{ $textColor: string }>`
  margin: 32px 0 0 0;
  font-size: 30px;
  font-weight: bold;
  color: ${(props) => props.$textColor};
`;
const FormContainer = styled(View)`
  margin-top: 8%;
`;
const StyledButton = styled(Button)`
  width: 84%;
  height: 10%;
  font-size: 25px;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  margin-top: 16%;
  justify-content: center;
`;
const ClickLink = styled(Text)<{ $color: string }>`
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  font-size: 16px;
  justify-content:center;
  align-items:center;
  
`;
