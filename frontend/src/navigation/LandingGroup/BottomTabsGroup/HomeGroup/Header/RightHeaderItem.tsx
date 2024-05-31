import { MaterialCommunityIcons } from "@expo/vector-icons";
import useThemeContext from "~/hooks/useThemeContext";
import { TouchableOpacity } from "react-native";
import { useCallback } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";

export default function RightHeaderItem() {
  const { theme } = useThemeContext();
  const { navigateTo } = useNavigationContext();
  const goToMessages = useCallback(() => {
    navigateTo({ page: "Messages" });
  }, []);

  return (
    <TouchableOpacity onPress={goToMessages}>
      <MaterialCommunityIcons
        name="chat-outline"
        size={28}
        color={theme.colors.onSecondary}
      />
    </TouchableOpacity>
  );
}
