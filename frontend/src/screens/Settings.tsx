import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import useThemeContext from "~/hooks/useThemeContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputField from "~/components/InputField";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import useAuthContext from "~/hooks/useAuthContext";
import { useMutation } from "@tanstack/react-query";
import { settingsForm } from "~/types/Profile";
import { updateUserInformation } from "~/lib/apiFunctions/Profile";
import useNavigationContext from "~/hooks/useNavigationContext";

const schema = z.object({
  password: z.string().optional(),
  degreeName: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export default function Settings({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const { user, setUser } = useAuthContext();
  const { navigateBack } = useNavigationContext();
  const { theme } = useThemeContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<settingsForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      password: "",
      degreeName: user?.degreeName,
      firstName: user?.firstName,
      lastName: user?.lastName,
    },
  });

  const settingsMutation = useMutation({
    mutationFn: updateUserInformation,
    onSuccess: () => {
      setUser((prev) => ({
        ...prev!,
        degreeName: getValues("degreeName"),
        firstName: getValues("firstName"),
        lastName: getValues("lastName"),
      }));
      reset();
      navigateBack();
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("Error", "An error occurred while updating your information");
    },
  });

  const onSubmit = (data: settingsForm) => {
    if (data.firstName === "" || data.lastName === "") {
      Alert.alert(
        "Fields are Required",
        "First Name and Last Name are required",
      );
      return;
    }
    settingsMutation.mutate(data);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSubmit(onSubmit)}>
          <Text
            style={{
              color: "white",
              fontSize: 18,
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={{ backgroundColor: theme.colors.tertiary }}>
          <View
            style={{
              width: "90%",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <View style={{ marginTop: 10 }}>
                  <InputField
                    label={"First Name"}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    autoCorrect={false}
                    autoComplete={"off"}
                    style={{ backgroundColor: theme.colors.tertiary }}
                    disabled={settingsMutation.isPending}
                  />
                </View>
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
                  label={"Last Name"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCorrect={false}
                  autoComplete={"off"}
                  style={{ backgroundColor: theme.colors.tertiary }}
                  disabled={settingsMutation.isPending}
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
                  label={"Current Program"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCorrect={false}
                  autoComplete={"off"}
                  disabled={settingsMutation.isPending}
                  style={{ backgroundColor: theme.colors.tertiary }}
                />
              )}
              name="degreeName"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label={"Password"}
                  secureTextEntry={true}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCorrect={false}
                  autoCapitalize={"none"}
                  autoComplete={"off"}
                  style={{ backgroundColor: theme.colors.tertiary }}
                  disabled={settingsMutation.isPending}
                />
              )}
              name="password"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
