import {
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";
import { StackActions, useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import useAppContext from "~/hooks/useAppContext";
import useAuthContext from "~/hooks/useAuthContext";
import { Dropdown } from "react-native-element-dropdown";
import { StyleSheet } from "react-native";
import { institution } from "~/contexts/authContext";
import { userRegistrationData } from "~/contexts/authContext";
import ErrorText from "~/components/ErrorText";
import useLoadingContext from "~/hooks/useLoadingContext";
import { validDomains } from "~/lib/constants";

const schema = zod
  .object({
    email: zod
      .string()
      .email({ message: "Invalid email format" })
      .refine(
        (email) => {
          const domain = email.substring(email.lastIndexOf("@"));
          return validDomains.includes(domain);
        },
        { message: "Email domain is not from a valid domain" },
      ),
    institutionId: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    rePassword: zod.string(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

export default function StudentSignUp() {
  const { theme } = useThemeContext();
  const navigation = useNavigation<any>();
  const [institutions, setInstitutions] = useState<institution[]>([]);
  const { getInstitutions, registerUser } = useAuthContext();
  const { dismissKeyboard } = useAppContext();
  const { startLoading, stopLoading } = useLoadingContext();

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
      startLoading();
      registerUser({
        email: data.email,
        institutionId: data.institutionId,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      }).then(() => {
        stopLoading();
        navigation.dispatch(StackActions.replace("ConfirmEmail"));
      });
    },
    [navigation],
  );

  const handlePress = useCallback(() => {
    navigation.dispatch(StackActions.push("OrgSignUp"));
  }, []);

  useEffect(() => {
    getInstitutions().then((res) => {
      setInstitutions(res.data);
    });
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: theme.colors.tertiary }}
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <MainContainer $color={theme.colors.primary}>
            <HeaderContainer>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{ marginTop: "10%", marginLeft: "3%" }}
                activeOpacity={0.7}
              >
                <AntDesign name="caretleft" size={24} color="white" />
              </TouchableOpacity>
              <HeaderText $textColor={theme.colors.mainText}>
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
                      label={
                        errors.email ? (
                          <ErrorText error={"University Email is required."} />
                        ) : (
                          "University Email"
                        )
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCorrect={false}
                      autoCapitalize={"none"}
                      autoComplete={"off"}
                      style={{ backgroundColor: theme.colors.tertiary }}
                    />
                  )}
                  name="email"
                />
                {errors.institutionId && (
                  <ErrorText error={"School is required."} />
                )}
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <Dropdown
                        style={{
                          ...styles.dropdown,
                          backgroundColor: theme.colors.tertiary,
                        }}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={institutions}
                        // search
                        onBlur={onBlur}
                        maxHeight={300}
                        labelField="name"
                        valueField="id"
                        placeholder="Select School"
                        value={value}
                        onChange={(value) => {
                          onChange(value.id);
                        }}
                      />
                    </>
                  )}
                  name="institutionId"
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      label={
                        errors.firstName ? (
                          <ErrorText error={"First name is required."} />
                        ) : (
                          "First Name"
                        )
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCorrect={false}
                      autoComplete={"off"}
                      style={{ backgroundColor: theme.colors.tertiary }}
                    />
                  )}
                  name="firstName"
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      label={
                        errors.lastName ? (
                          <ErrorText error={"Last name is required."} />
                        ) : (
                          "Last Name"
                        )
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCorrect={false}
                      autoComplete={"off"}
                      style={{ backgroundColor: theme.colors.tertiary }}
                    />
                  )}
                  name="lastName"
                />
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      label={
                        errors.password && errors.password.message ? (
                          <ErrorText error={errors.password.message} />
                        ) : (
                          "Password"
                        )
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCorrect={false}
                      autoCapitalize={"none"}
                      autoComplete={"off"}
                      textContentType={"password"}
                      style={{ backgroundColor: theme.colors.tertiary }}
                    />
                  )}
                  name="password"
                />
                <Controller
                  control={control}
                  rules={{
                    required: "Password confirmation is required.",
                  }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <InputField
                      label={
                        errors.rePassword ? (
                          <ErrorText error={"Password Doesn't Match."} />
                        ) : (
                          "Re-enter Password"
                        )
                      }
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      autoCorrect={false}
                      autoCapitalize={"none"}
                      autoComplete={"off"}
                      textContentType={"password"}
                      style={{ backgroundColor: theme.colors.tertiary }}
                    />
                  )}
                  name="rePassword"
                />

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
                    Submit
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
                      color: theme.colors.text,
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Component
// prettier-ignore
const MainContainer = styled(View)<{ $color: string }>`
    height: 100%;
    background-color: ${(props)=>props.$color};
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

const styles = StyleSheet.create({
  dropdown: {
    margin: 12,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
