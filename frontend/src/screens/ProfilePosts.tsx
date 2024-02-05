import { View } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";

export default function ProfilePosts() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Posts</ThemedText>
        </View>
    )
}