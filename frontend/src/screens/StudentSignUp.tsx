import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import useAppContext from "~/hooks/useAppContext";
import useAuthContext from "~/hooks/useAuthContext";
import { userRegistrationData } from "~/contexts/authContext";




export default function StudentSignUp() {
  const { theme } = useThemeContext();
  const navigation = useNavigation<any>();
  const [valid, setValid] = useState(false);
  const {registerUser} = useAuthContext();
  

  const schema = zod.object({
    email: zod.string(),
    institutionName: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegistrationData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (data: userRegistrationData) => {
      console.log(data);
      registerUser(data);
      //navigation.navigate("StudentSignUpInfo");
      //validate()
    },
    [navigation],
  );

  const handlePress = useCallback(() => {
    console.log("Pressed");
    // Add any navigation or logic here
  }, []);

  const { dismissKeyboard } = useAppContext();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <MainContainer>
        <HeaderContainer>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={{ marginTop: "10%", marginLeft: "3%" }}
            activeOpacity={0.7}
          >
            <AntDesign name="caretleft" size={24} color="white" />
          </TouchableOpacity>
          <HeaderText $textColor={theme.colors.tertiary}>
            Student Sign Up
          </HeaderText>
        </HeaderContainer>
        <OverlayContainer $color={theme.colors.tertiary}>
          <FormContainer>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Institution Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && <Text>University Email is required.</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Institution Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="institutionName"
            />
            {errors.institutionName && <Text>Institution Name is required.</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="First Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="firstName"
            />
            {errors.firstName && <Text>Institution Name is required.</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Last Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="lastName"
            />
            {errors.lastName && <Text>Institution Name is required.</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password && <Text>Institution Name is required.</Text>}
            {/* <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label="Retype Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="rePassword"
            />
            {errors.rePassword && <Text>Institution Name is required.</Text>} */}
            <StyledButton
              mode="contained"
              onPress={handleSubmit(onSubmit)}
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
                Next
              </Text>
            </StyledButton>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 32,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Roboto-Reg",
                  marginRight: 5,
                }}
              >
                Sign up as an Organization
              </Text>
              <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontSize: 16,
                    fontFamily: "Roboto-Reg",
                  }}
                >
                  here
                </Text>
              </TouchableOpacity>
            </View>
          </FormContainer>
        </OverlayContainer>
      </MainContainer>
    </TouchableWithoutFeedback>
  );
}

// Component
// prettier-ignore
const MainContainer = styled(View)`
    height: 100%;
    background-color: #3a86ff;
`;
// prettier-ignore
const OverlayContainer = styled(View)<{ $color: string }>`
    align-items: center;
    height: 85%;
    width: 100%;
    border-top-left-radius: 76px;
    background-color: ${(props) => props.$color};
`;
// prettier-ignore
const HeaderContainer = styled(View)`
    width: 100%;
    height: 15%;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;
// prettier-ignore
const HeaderText = styled(Text)<{ $textColor: string }>`
    margin: 32px auto 0px auto;
    color: ${(props) => props.$textColor};
    font-size: 28px;
    font-weight: bold;
    font-family: "Nunito-Bold";
`;
// prettier-ignore
const FormContainer = styled(View)`
    width: 90%;
    margin-top: 18%;
    height: 500px;
`;
// prettier-ignore
const InputField = styled(TextInput)`
    width: 100%;
    height: 56px;
    margin-bottom: 25px;
    border-radius: 8px 8px 0 0;
    font-family: Roboto-Reg;
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
