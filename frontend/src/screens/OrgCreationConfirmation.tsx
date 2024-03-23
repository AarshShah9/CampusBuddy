import { View, Image, Text } from "react-native";
import useThemeContext from "~/hooks/useThemeContext";
import { Button } from "react-native-paper";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

export default function OrgCreationConfirmation() {
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
              width: 300,
              fontSize: 30,
              color: "white",
            }}
          >
            {"Thank you for your\n registration! Please verify your email"}
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
            We're glad you're here! Before you can start, our team will have to
            verify you. You will receive an email once your account is ready.
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
            Return to login
          </Text>
        </Button>
      </View>
    </View>
  );
}
