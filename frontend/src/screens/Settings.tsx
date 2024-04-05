import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "~/hooks/useThemeContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styled from "styled-components";
import InputField from "~/components/InputField";

type settingsForm = {
  password: string;
  currentProgram: string;
  firstName: string;
  lastName: string;
};

const schema = z.object({
  password: z.string().optional(),
  currentProgram: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

export default function Settings() {
  const { theme } = useThemeContext();

  return (
    <View>
      <Text>Settings</Text>
      {/*    TODO change pfp */}
      {/*    text inputs for password, current program, first name and last name*/}
    </View>
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
});
