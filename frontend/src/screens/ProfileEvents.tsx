import { View } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";

export default function ProfileEvents() {
    return (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ThemedText>Your Events</ThemedText>
        </View>
    );
}
