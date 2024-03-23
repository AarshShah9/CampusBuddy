import { View, Image, Text } from "react-native";
import useThemeContext from "~/hooks/useThemeContext";
import { Button } from "react-native-paper";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

export default function EmailConfirmationNotice() {
  const { theme } = useThemeContext();
  const navigation = useNavigation<any>();

  const navigateToLogin = useCallback(() => {
    navigation.navigate("Login");
  }, []);

  return (
    <View style={{ height: "100%", backgroundColor: theme.colors.primary }}>
      <View>
        <Image
          style={{ marginTop: 150, marginLeft: "auto", marginRight: "auto" }}
          source={require("~/assets/Campus_Buddy_Logo.png")}
        />
        <View>
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              width: 400,
              fontSize: 36,
              color: "white",
            }}
          >
            {"Email Confirmation"}
          </Text>
          <Text
            style={{
              marginTop: 35,
              marginLeft: "auto",
              marginRight: "auto",
              textAlign: "center",
              width: 300,
              fontSize: 20,
              color: "white",
            }}
          >
            {
              "We have sent an email to the one you provided to confirm the validity of your email address. After recieving the email follow the link provided to complete your registration."
            }
          </Text>
        </View>
        <Button
          style={{
            width: 300,
            marginTop: 50,
            marginLeft: "auto",
            marginRight: "auto",
            backgroundColor: "black",
          }}
          onPress={() => {
            navigateToLogin();
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 24,
              lineHeight: 30,
            }}
          >
            {"Confirm"}
          </Text>
        </Button>
      </View>
    </View>
  );
}
