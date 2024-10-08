import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import useThemeContext from "~/hooks/useThemeContext";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { Dropdown } from "react-native-element-dropdown";
import { institution, organizationInformation } from "~/contexts/authContext";
import useAuthContext from "~/hooks/useAuthContext";
import useLoadingContext from "~/hooks/useLoadingContext";
import ErrorText from "~/components/ErrorText";
import useNavigationContext from "~/hooks/useNavigationContext";
import { OrganizationRegistrationSchema } from "~/types/schemas";

export default function OrganizationSignUp() {
  let lastStep = 2;

  const { theme } = useThemeContext();
  const [valid, setValid] = useState(false);
  const [institutions, setInstitutions] = useState<institution[]>([]);
  const [step, setStep] = useState(1);
  const { getInstitutions, registerOrganization } = useAuthContext();
  const { startLoading, stopLoading } = useLoadingContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<organizationInformation>({
    resolver: zodResolver(OrganizationRegistrationSchema),
  });

  useEffect(() => {
    getInstitutions().then((res) => {
      setInstitutions(res.data);
    });
  }, []);

  const { replaceStackWith, navigateBack } = useNavigationContext();
  const onSubmit = (data: organizationInformation) => {
    startLoading();
    registerOrganization(data).then(() => {
      stopLoading();
      replaceStackWith("OrgCreationConfirmation");
    });
  };

  const onBack = () => {
    if (step === 2) {
      setStep(1);
      return;
    }
    navigateBack();
  };

  const onNext = async () => {
    let result = false;
    switch (step) {
      case 1:
        result = await trigger([
          "orgEmail",
          "firstName",
          "lastName",
          "organizationName",
          "institutionId",
        ]);
        break;
      case 2:
        result = await trigger(["description", "password", "confirmPassword"]);
        break;
    }

    if (result) {
      setStep((currentStep) => currentStep + 1); // Move to the next step if validation is successful
    }
  };

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
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View
            style={[
              styles.overlayContainer,
              { backgroundColor: theme.colors.tertiary },
            ]}
          >
            <FormContainer>
              {step === 1 && (
                <>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <InputField
                        label={
                          errors.orgEmail && errors.orgEmail.message ? (
                            <ErrorText error={errors.orgEmail.message} />
                          ) : (
                            "Email"
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
                    name="orgEmail"
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
                          errors.organizationName &&
                          errors.organizationName.message ? (
                            <ErrorText
                              error={errors.organizationName.message}
                            />
                          ) : (
                            "Organization Name"
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
                    name="organizationName"
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
                          style={styles.dropdown}
                          placeholderStyle={styles.placeholderStyle}
                          selectedTextStyle={styles.selectedTextStyle}
                          inputSearchStyle={styles.inputSearchStyle}
                          iconStyle={styles.iconStyle}
                          data={institutions}
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
                </>
              )}
              {step === 2 && (
                <>
                  <Controller
                    control={control}
                    rules={{
                      required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <View style={{ marginTop: 10, marginBottom: 15 }}>
                        <TextInput
                          style={{
                            ...styles.inputBox,
                            backgroundColor: theme.colors.tertiary,
                          }}
                          onBlur={onBlur}
                          onChangeText={onChange}
                          value={value}
                          autoCorrect={false}
                          autoCapitalize={"none"}
                          autoComplete={"off"}
                          label={
                            errors.description && errors.description.message ? (
                              <ErrorText error={errors.description.message} />
                            ) : (
                              "Description"
                            )
                          }
                        />
                      </View>
                    )}
                    name="description"
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
                      required: true,
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
                </>
              )}
              <StyledButton
                mode="contained"
                onPress={step === lastStep ? handleSubmit(onSubmit) : onNext}
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
                  {step === lastStep ? "Submit" : "Next"}
                </Text>
              </StyledButton>
              <ClickLink $color={theme.colors.primary}>
                <Text style={{ color: theme.colors.text }}>
                  Join an organization{" "}
                </Text>
                <Text
                  onPress={() => {
                    Alert.alert("Coming soon!", "Stay tuned for updates.");
                  }}
                  style={{
                    color: theme.colors.primary,
                    fontSize: 16,
                    fontFamily: "Roboto-Reg",
                  }}
                >
                  here.
                </Text>
              </ClickLink>
            </FormContainer>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Component
const FormContainer = styled(View)`
  width: 90%;
  margin-top: 10%;
  height: 500px;
`;

const InputField = styled(TextInput)`
  width: 100%;
  height: 56px;
  margin-bottom: 25px;
  border-radius: 8px 8px 0 0;
  font-family: Roboto-Reg;
`;

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
const ClickLink = styled(Text)<{ $color: string }>`
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
  font-size: 16px;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  dropdown: {
    margin: 12,
    height: 50,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  overlayContainer: {
    alignItems: "center",
    height: "85%",
    width: "100%",
    borderTopLeftRadius: 76,
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
  inputBox: {
    width: 350,
    height: 55,
    borderRadius: 8,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
