import { View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { ThemedText } from "~/components/ThemedComponents";

export default function ModalScreen() {
  const { setOptions: setNavigationOptions } = useNavigation<any>();
  const { params: { type } } = useRoute<any>();

  useLayoutEffect(() => {
    setNavigationOptions({
      headerTitle: `${type}`,
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>{`${type}`}</ThemedText>
    </View>
  );
}