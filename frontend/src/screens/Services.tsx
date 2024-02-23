import { View, TouchableWithoutFeedback } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";

export default function Services() {
    const { dismissKeyboard } = useAppContext();
    
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ThemedText>Services</ThemedText>
            </View>
        </TouchableWithoutFeedback>
    );
}
