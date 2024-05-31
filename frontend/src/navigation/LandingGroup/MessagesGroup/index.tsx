import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chats from "~/screens/Chats";
import Chat from "~/screens/Chat";
import useThemeContext from "~/hooks/useThemeContext";
import ChatScreenHeader from "./ChatScreenHeader";
import BackButton from "./ChatsScreenBackButton";

const Stack = createNativeStackNavigator();

export default function MessagesStackGroup() {
  const { theme } = useThemeContext();

  return (
    <Stack.Navigator
      initialRouteName="ChatList"
      screenOptions={{
        headerTintColor: theme.colors.onSecondary,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },

        headerTitleStyle: {
          fontSize: 21,
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="ChatList"
        component={Chats}
        options={{
          title: "Chats",
          headerLeft: BackButton,
        }}
      />
      <Stack.Screen
        name="ChatScreen"
        component={Chat}
        options={{ headerTitle: ChatScreenHeader }}
      />
    </Stack.Navigator>
  );
}
