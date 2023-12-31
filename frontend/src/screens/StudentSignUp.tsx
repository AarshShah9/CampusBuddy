import { View, Text, Keyboard } from "react-native";
import { Button } from "react-native-paper";
import InputField from "~/components/InputField";
import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export default function StudentSignUp() {
  const { theme } = useThemeContext();
  const navigation = useNavigation<any>();
  const [valid, setValid] = useState(false);
  const [errors, setErrors] = useState({ password: null });
  const [inputs, setInputs] = useState({
    email: "",
    uniName: "",
    fName: "",
    lName: "",
    password: "",
    rePassword: "",
  });

  const errorHandler = (errorMsg: string | null, errorType: string) => {
    setErrors((prevState) => ({ ...prevState, [errorType]: errorMsg }));
  };
  const onChangeHandler = (text: string, input: string) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const emailValidate = () => {
    Keyboard.dismiss();
  };
  const passwordValidator = () => {
    if (!inputs.password) {
      errorHandler("Please enter a password", "password");
    } else if (inputs.password.length < 8) {
      errorHandler("Minimum length must be 8 characters", "password");
    }
  };

  return (
    <MainContainer>
      <HeaderContainer>
        <Text
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          BACK
        </Text>
        <HeaderText $textColor={theme.colors.tertiary}>
          Student Sign Up
        </HeaderText>
      </HeaderContainer>
      <OverlayContainer $color={theme.colors.tertiary}>
        {!valid && (
          <FormContainer>
            <InputField
              name="Institution Email"
              placeholder="example@ucalgary.com"
              onChangeText={(text: string) => onChangeHandler(text, "email")}
              value={inputs.email}
            />
            <InputField
              name="Institution Name"
              placeholder="Institution Name"
              onChangeText={(text: string) => onChangeHandler(text, "uniName")}
              value={inputs.uniName}
            />
            <StyledButton
              mode="contained"
              onPress={() => {
                setValid(true);
              }} // Will need to implment a verification of proper info
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                Next
              </Text>
            </StyledButton>
            <ClickLink $color={theme.colors.primary}>
              Sign up as an Organization
              <Text
                onPress={() => {
                  console.log("Pressed");
                }}
                style={{ color: theme.colors.primary, fontSize: 16 }}
              >
                {" "}
                here{" "}
              </Text>
            </ClickLink>
          </FormContainer>
        )}
        {valid && (
          <FormContainer>
            <InputField name="First Name" />
            <InputField name="Last Name" />
            <InputField
              name="Password"
              onChangeText={(text: string) => onChangeHandler(text, "password")}
              focus={errorHandler}
              error={errors.password}
            />
            <InputField
              name="Re-enter Password"
              onChangeText={(text: string) =>
                onChangeHandler(text, "rePassword")
              }
            />
            <StyledButton mode="contained" onPress={passwordValidator}>
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "white" }}
              >
                Agree and Continue
              </Text>
            </StyledButton>
          </FormContainer>
        )}
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

const FormContainer = styled(View)`
  margin-top: 8%;
  height: 100%;
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
  justify-content: center;
  align-items: center;
`;
