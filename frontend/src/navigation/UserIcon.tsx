import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import useThemeContext from "~/hooks/useThemeContext";

export default function UserIcon() {
  const { theme } = useThemeContext();
  return (
    <TouchableOpacity
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <FontAwesome5
        name="user-circle"
        size={28}
        color={theme.colors.onSurfaceVariant}
      />
    </TouchableOpacity>
  );
}
