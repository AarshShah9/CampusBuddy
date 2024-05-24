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
import useNavigationContext from "~/hooks/useNavigationContext";
import { StudentRegistrationSchema } from "~/types/schemas";

export default function StudentSignUp() {
  const { theme } = useThemeContext();
  const [institutions, setInstitutions] = useState<institution[]>([]);
  const { getInstitutions, registerUser } = useAuthContext();
  const { dismissKeyboard } = useAppContext();
  const { navigateTo, replaceStackWith } = useNavigationContext();
  const { startLoading, stopLoading } = useLoadingContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<userRegistrationData>({
    resolver: zodResolver(StudentRegistrationSchema),
  });

  const onSubmit = useCallback((data: userRegistrationData) => {
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
      replaceStackWith("ConfirmEmail");
    });
  }, []);

  const handlePress = useCallback(() => {
    navigateTo({ page: "OrgSignUp" });
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
                      errors.email && errors.email.message ? (
                        <ErrorText error={errors.email.message} />
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
              {errors.institutionId && errors.institutionId.message && (
                <ErrorText error={errors.institutionId.message} />
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
                      errors.firstName && errors.firstName.message ? (
                        <ErrorText error={errors.firstName.message} />
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
                      errors.lastName && errors.lastName.message ? (
                        <ErrorText error={errors.lastName.message} />
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
                      errors.confirmPassword &&
                      errors.confirmPassword.message ? (
                        <ErrorText error={errors.confirmPassword.message} />
                      ) : (
                        "Confirm Password"
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
                name="confirmPassword"
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
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Component
// prettier-ignore
const OverlayContainer = styled(View)<{ $color: string }>`
    align-items: center;
    height: 85%;
    width: 100%;
    background-color: ${(props) => props.$color};
`;
// prettier-ignore
const FormContainer = styled(View)`
    width: 90%;
    margin-top: 10%;
    margin-bottom: 10%;
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
