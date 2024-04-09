import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import useNavigationContext from "~/hooks/useNavigationContext";
import useAuthContext from "~/hooks/useAuthContext";

export default function SplashScreen() {
  const { width, height } = Dimensions.get("window");
  const { isUserLoggedIn } = useAuthContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [fontsLoaded] = useFonts({
    "Nunito-Medium": require("~/assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Bold": require("~/assets/fonts/Nunito-Bold.ttf"),
    "Nunito-Reg": require("~/assets/fonts/Nunito-Reg.ttf"),
    "Roboto-Reg": require("~/assets/fonts/Roboto-Reg.ttf"),
    "Roboto-Medium": require("~/assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Bold": require("~/assets/fonts/Roboto-Bold.ttf"),
  });

  const logIn = useCallback(async () => {
    const loggedIn = await isUserLoggedIn();
    setLoggedIn(loggedIn);
    setLoading(false);
  }, []);

  const { replaceStackWith } = useNavigationContext();

  useEffect(() => {
    if (loading) {
      logIn();
    }
    if (!loading && fontsLoaded) {
      if (loggedIn) {
        replaceStackWith("LandingGroup");
      } else {
        replaceStackWith("AuthenticationGroup");
      }
    }
  }, [loading, fontsLoaded]);

  return (
    <View style={styles.container}>
      <LottieView
        loop={false}
        style={{ width: width, height: height }}
        progress={1}
        source={require("~/assets/SplashScreenAnimation.json")}
        autoPlay
        speed={3}
      />
    </View>
  );
}

// prettier-ignore
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#3A86FF",
    },
});
