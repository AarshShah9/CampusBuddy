import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import useThemeContext from "~/hooks/useThemeContext";

export default function DrawerIcon() {
  const navigation = useNavigation<any>();
  const { theme } = useThemeContext();

  return (
    <TouchableOpacity
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={() => navigation.openDrawer()}
    >
      <Ionicons name="menu" size={32} color={theme.colors.onSurfaceVariant} />
    </TouchableOpacity>
  );
}
