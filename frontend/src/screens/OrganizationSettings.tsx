import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "~/hooks/useThemeContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "styled-components";
import InputField from "~/components/InputField";
import { Button } from "react-native-paper";

type settingsForm = {
  password: string;
  organizationName: string;
  description: string;
};

const schema = z.object({
  password: z.string().optional(),
  organizationName: z.string().optional(),
  description: z.string().optional(),
});

export default function OrganizationSettings() {
  const { theme } = useThemeContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<settingsForm>({ resolver: zodResolver(schema) });

  // Handles submission of user data
  const onSubmit = (data: settingsForm) => {
    // setIsSubmitting(true);
    // createMutation.mutate({
    //   title: data.title,
    //   description: data.description,
    //   numberOfSpots: parseInt(data.numberOfSpots),
    //   expiresAt: data.expiryDate,
    //});
    console.log(data);
  };

  return (
    <ScrollView>
      <View style={{ backgroundColor: theme.colors.tertiary }}>
        {/*    TODO change pfp */}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={{ marginTop: 20, marginBottom: 15 }}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 3,
                  fontFamily: "Nunito-Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                Organization Name
              </Text>
              <TextInput
                style={[styles.inputBox, { color: theme.colors.text }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
            <View style={{ marginTop: 20, marginBottom: 15 }}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 3,
                  fontFamily: "Nunito-Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                Description
              </Text>
              <TextInput
                style={[styles.inputBox, { color: theme.colors.text }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
            <View style={{ marginTop: 20, marginBottom: 15 }}>
              <Text
                style={{
                  marginLeft: 20,
                  marginBottom: 3,
                  fontFamily: "Nunito-Medium",
                  fontSize: 16,
                  color: theme.colors.text,
                }}
              >
                Password
              </Text>
              <TextInput
                style={[styles.inputBox, { color: theme.colors.text }]}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            </View>
          )}
          name="password"
        />
        <View style={{ marginTop: 100 }}>
          <Button
            style={{
              width: 300,
              marginLeft: "auto",
              marginRight: "auto",
              backgroundColor: theme.colors.primary,
            }}
            onPress={handleSubmit(onSubmit)}
            //disabled={isSubmitting}
          >
            <Text
              style={{
                color: "white",
                fontFamily: "Roboto-Bold",
                fontSize: 24,
                lineHeight: 30,
              }}
            >
              Done
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "90%",
    marginTop: "8%",
    height: 500,
    marginLeft: "auto",
    marginRight: "auto",
  },
  inputBox: {
    width: 350,
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "grey",
    marginLeft: 20,
  },
});
