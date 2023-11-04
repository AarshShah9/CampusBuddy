import { View } from "react-native";
import { ThemedText } from "../../components/ThemeProvider";

export default function Carpool() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Carpool Screen</ThemedText>
        </View>
    )
}