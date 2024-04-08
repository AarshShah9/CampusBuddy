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
import { OrganizationProfileForm, settingsForm } from "~/types/Profile";
import { updateOrgInformation } from "~/lib/apiFunctions/Profile";
import useNavigationContext from "~/hooks/useNavigationContext";

const schema = z.object({
  organizationName: z.string().optional(),
  description: z.string().optional(),
});

export default function Settings({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const { organization, setOrganization } = useAuthContext();
  const { navigateBack } = useNavigationContext();
  const { theme } = useThemeContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<OrganizationProfileForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      organizationName: organization?.organizationName[0] ?? "",
      description: organization?.organizationDescription[0] ?? "",
    },
  });

  const settingsMutation = useMutation({
    mutationFn: (data: OrganizationProfileForm) =>
      updateOrgInformation(data, organization!.organizationId[0]),
    onSuccess: () => {
      setOrganization((prev) => ({
        ...prev!,
        organizationName: [getValues("organizationName")],
        organizationDescription: [getValues("description")],
      }));
      reset();
      navigateBack();
    },
    onError: (error) => {
      console.log(error);
      Alert.alert("Error", "An error occurred while updating your information");
    },
  });

  const onSubmit = (data: OrganizationProfileForm) => {
    if (data.organizationName === "") {
      Alert.alert("Fields are Required", "Organization name is required");
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
                    label={"Organization Name"}
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
              name="organizationName"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  label={"Description"}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCorrect={false}
                  autoComplete={"off"}
                  style={{ backgroundColor: theme.colors.tertiary }}
                  disabled={settingsMutation.isPending}
                />
              )}
              name="description"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
