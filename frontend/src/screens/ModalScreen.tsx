import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";

export default function ModalScreen() {
  const { setNavigationOptions } = useAppContext();
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