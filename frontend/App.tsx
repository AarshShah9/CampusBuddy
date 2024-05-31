import "react-native-reanimated";
import "react-native-gesture-handler";
import ContextFactory from "~/contexts";
import Navigation from "~/navigation";
import { LogBox } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// For demo purposes ignore warning messages
LogBox.ignoreLogs([""]);

export default function App() {
  return (
    <ContextFactory>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Navigation />
      </GestureHandlerRootView>
    </ContextFactory>
  );
}
