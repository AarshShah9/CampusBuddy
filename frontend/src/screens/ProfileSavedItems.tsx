import { View } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";

export default function ProfileSavedItems() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>Saved Items</ThemedText>
    </View>
  );
}
