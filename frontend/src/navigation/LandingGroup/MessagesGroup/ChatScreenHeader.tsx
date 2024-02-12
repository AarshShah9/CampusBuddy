import { useRoute } from "@react-navigation/native";
import { View, Image, StyleSheet } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";

export default function ChatScreenHeader() {
  const {
    params: { userName, icon },
  } = useRoute<any>();

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{ width: 40, height: 40, borderRadius: 50, overflow: "hidden" }}
      >
        <Image
          style={{ width: "100%", height: "100%" }}
          source={{ uri: icon }}
        />
      </View>
      <ThemedText style={styles.userName}>{userName}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  userName: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
