import { Text } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  TextStyle,
} from "react-native";
import useThemeContext from "~/hooks/useThemeContext";

type Props = {
  location: string;
  size?: "small" | "normal";
};

export default function LocationChip({ location, size = "normal" }: Props) {
  const { theme } = useThemeContext();

  const containerStyles: StyleProp<ViewStyle> =
    size === "small"
      ? {
          borderRadius: 24,
          paddingVertical: 2,
          paddingRight: 4,
        }
      : {
          borderRadius: 29,
          paddingVertical: 2.5,
          paddingRight: 6,
        };

  const iconSize = size === "small" ? 15 : 20;

  const textStyles: StyleProp<TextStyle> =
    size === "small" ? { fontSize: 10 } : {};

  return (
    <View
      style={[
        styles.container,
        containerStyles,
        {
          backgroundColor: theme.colors.inversePrimary,
        },
      ]}
    >
      <View style={styles.innerContainer}>
        <EvilIcons name="location" size={iconSize} color="black" />
        <Text style={[styles.text, textStyles]}>{location}</Text>
      </View>
    </View>
  );
}

// prettier-ignore
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        paddingLeft: 1,
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Roboto-Medium'
    }
})
