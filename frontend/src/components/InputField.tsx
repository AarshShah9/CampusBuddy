import { TextInput, TextInputProps } from "react-native-paper";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import useThemeContext from "~/hooks/useThemeContext";

/* Custom Component which display text of what info is required and sets a input box with specified primary theme */

export default function InputField({ error, ...props }: any) {
  const [isFocused, setFocused] = useState(false);
  const [hidePassword, setHidePassword] = useState(props.password);
  const { theme } = useThemeContext();

  return (
    <View style={styles.container}>
      <Text style={styles.header2}>{props.name}</Text>

      <TextInput
        secureTextEntry={hidePassword}
        underlineColorAndroid="transparent"
        style={[
          styles.input,
          {
            borderColor: error
              ? "red"
              : isFocused
              ? theme.colors.primary
              : "grey",
          },
        ]}
        {...props}
        onFocus={() => {
          // currently not working
          // props.focus(null, "password");
          setFocused(true);
        }}
        onBlur={() => {
          setFocused(false);
        }}
      />

      {error && <Text style={styles.errorMsg}>{error}</Text>}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    overflow: "hidden",
  },
  input: {
    width: "84%",
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "3%",
    backgroundColor: "white",
    outlineStyle: "none",
    overflow: "hidden",
  },
  header2: {
    marginLeft: "8%",
    fontSize: 16,
    marginBottom: "1%",
  },
  errorMsg: {
    color: "red",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: "2%",
  },
});
