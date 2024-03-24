import { Text } from "react-native";

export default function ErrorText({ error }: { error: string }) {
  return <Text style={{ color: "red", fontSize: 12 }}>{error}</Text>;
}
