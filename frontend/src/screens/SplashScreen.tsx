import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import useNavigationContext from "~/hooks/useNavigationContext";

export default function SplashScreen() {
    const { width, height } = Dimensions.get("window");
    const [loading, setLoading] = useState<boolean>(true);
    const [fontsLoaded] = useFonts({
        "Nunito-Medium": require("~/assets/fonts/Nunito-Medium.ttf"),
    "Nunito-Bold": require("~/assets/fonts/Nunito-Bold.ttf"),
        "Nunito-Reg": require("~/assets/fonts/Nunito-Reg.ttf"),
        "Roboto-Reg": require("~/assets/fonts/Roboto-Reg.ttf"),
        "Roboto-Medium": require("~/assets/fonts/Roboto-Medium.ttf"),
        "Roboto-Bold": require("~/assets/fonts/Roboto-Bold.ttf"),
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

    const { replaceStackWith } = useNavigationContext();

    useEffect(() => {
        if (!loading && fontsLoaded) {
            // On state change to loading, indicate ready to switch pages
            console.log("Finished Loading move to new page");
            replaceStackWith("AuthenticationGroup");
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