import { Button, View } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";
import { useCallback } from "react";
import { makeRequest } from "~/lib/CBRequest";

export default function Threads() {
  const onClickHandler = useCallback(async () => {
    makeRequest("GET", "/api/user/verify", {})
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ThemedText>Threads</ThemedText>
      <Button title={"TEST AUTH"} onPress={onClickHandler} />
    </View>
  );
}
