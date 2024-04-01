import useThemeContext from "~/hooks/useThemeContext";
import { Text, View } from "react-native";
import React from "react";

export default function OrganizationSettings() {
  const { theme } = useThemeContext();

  return (
    <View>
      <Text>Organization Settings</Text>
      {/*    TODO change pfp */}
      {/*    text inputs for password, organization name, description, organization image*/}
    </View>
  );
}
