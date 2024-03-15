import {
  Image,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";
import { MainContainer } from "~/components/ThemedComponents";
import { StackActions, useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useCallback } from "react";
import useAppContext from "~/hooks/useAppContext";
import useAuthContext from "~/hooks/useAuthContext";

type loginForm = {
  email: string;
  password: string;
};

export default function Login() {
  const { theme } = useThemeContext();
  const navigation = useNavigation<any>();
  const { signIn } = useAuthContext();

  const schema = zod.object({
    email: zod.string(),
    password: zod.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<loginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    (data: loginForm) => {
      console.log(data);
      signIn(data.email, data.password);
      navigation.dispatch(StackActions.replace("LandingGroup"));
    },
    [navigation],
  );

  const { dismissKeyboard } = useAppContext();

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <MainContainer $primary={theme.colors.primary}>
        <LogoContainer>
          <Image
            style={{ marginTop: 42 }}
            source={require("~/assets/Campus_Buddy_Logo.png")}
          />
        </LogoContainer>
        <OverlayContainer $color={theme.colors.tertiary}>
          <Header>{"Login"}</Header>
          <FormContainer>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  placeholder="Email"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
            {errors.email && <Text>Email is required.</Text>}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  placeholder="Password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="password"
            />
            {errors.password && <Text>Password is required.</Text>}

            <StyledButton mode="contained" onPress={handleSubmit(onSubmit)}>
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
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 64,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              <Text
                style={{
                  marginRight: 5,
                  fontSize: 16,
                  fontFamily: "Roboto-Reg",
                }}
              >
                Don't have an account?
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("StudentSignUp");
                }}
                activeOpacity={0.7}
              >
                <Text
                  style={{
                    color: theme.colors.primary,
                    fontFamily: "Roboto-Reg",
                  }}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
            </View>
          </FormContainer>
        </OverlayContainer>
      </MainContainer>
    </TouchableWithoutFeedback>
  );
}

// prettier-ignore
const LogoContainer = styled(View)`
    height: 28%;
    align-items: center;
    justify-content: center;
`;
// prettier-ignore
const OverlayContainer = styled(View)<{ $color: string }>`
    height: 74%;
    width: 100%;
    border-top-left-radius: 76px;
    border-width: 0;
    background-color: ${(props) => props.$color};
    justify-content: center;
    align-items: center;
`;
// prettier-ignore
const FormContainer = styled(View)`
    width: 90%;
    margin-top: 8%;
    height: 500px;
    margin-left: auto;
    margin-right: auto;
`;
// prettier-ignore
const Header = styled(Text)`
    font-size: 40px;
    font-weight: bold;
    margin-top: 64px;
    margin-bottom: 32px;
    margin-left: auto;
    margin-right: auto;
    font-family: Nunito-Bold;
`;
// prettier-ignore
const InputField = styled(TextInput)`
    width: 100%;
    height: 56px;
    margin-bottom: 30px;
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
