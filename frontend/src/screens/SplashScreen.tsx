import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function SplashScreen() {
  const { width, height } = Dimensions.get("window");
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation<any>();
  const [fontsLoaded] = useFonts({
    'Nunito-Bold': require('../../assets/fonts/Nunito-Bold.ttf'),
    'Roboto-Reg': require('../../assets/fonts/Roboto-Reg.ttf')
  });
  useEffect(() => {
    const loadData = async () => {
      try {
        //API calls or other checks needed
        //Simulate slow loading of 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!loading) {
      // On state change to loading, indicate ready to switch pages
      console.log("Finished Loading move to new page");
      navigation.navigate("Login");
    }
  }, [loading]);

  return (
    <View style={styles.container}>
      <LottieView
        loop={false}
        style={{ width: width, height: height }}
        progress={1}
        source={require("../../assets/SplashScreenAnimation.json")}
        autoPlay
        speed={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#3A86FF",
  },
});
