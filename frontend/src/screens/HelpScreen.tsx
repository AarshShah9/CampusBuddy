import { View, Text } from "react-native";
import React from "react";

import useThemeContext from "~/hooks/useThemeContext";

export default function HelpScreen() {
  const { theme } = useThemeContext();

  return (
    <View>
      <Text style={{ backgroundColor: theme.colors.tertiary, padding: 20 }}>
        Welcome to Campus Buddy. Please refer to our user guide, or go to
        CampusBuddy.org for more information.
      </Text>
    </View>
  );
}
