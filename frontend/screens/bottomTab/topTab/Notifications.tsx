import { View } from "react-native";
import { ThemedText } from "../../../components/ThemeProvider";

export default function NotificationSettings() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Notification Settings</ThemedText>
        </View>
    )
}