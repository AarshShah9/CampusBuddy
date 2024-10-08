import { Text } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import useThemeContext from "~/hooks/useThemeContext";

export default function CommentsChip() {
  const { theme } = useThemeContext();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.onSurface,
        },
      ]}
    >
      <View style={styles.innerContainer}>
        <FontAwesome5
          name="comments"
          size={15}
          color={theme.colors.onSurface}
        />
        <Text
          style={[
            styles.text,
            {
              color: theme.colors.onSurface,
            },
          ]}
        >
          Comments
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderRadius: 29,
    paddingVertical: 2.5,
    paddingHorizontal: 9,
    flexDirection: "row",
    alignSelf: "flex-start",
    justifyContent: "flex-start",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    marginLeft: 4,
  },
});
