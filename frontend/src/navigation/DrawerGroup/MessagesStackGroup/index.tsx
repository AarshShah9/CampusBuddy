import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chats from "~/screens/Chats";
import Chat from "~/screens/Chat";
import DrawerIcon from "~/navigation/DrawerIcon";
import UserIcon from "~/navigation/UserIcon";
import useThemeContext from "~/hooks/useThemeContext";
import ChatScreenHeader from "./ChatScreenHeader";
import { ChatsContextProvider } from "~/contexts/chatsContext";
import { ChatContextProvider } from "~/contexts/chatContext";

const Stack = createNativeStackNavigator();

export default function MessagesStackGroup() {
  const { theme } = useThemeContext();

  return (
    <ChatsContextProvider>
      <ChatContextProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="ChatList"
            component={Chats}
            options={{
              title: "Chats",
              headerLeft: () => <DrawerIcon />,
              headerRight: () => <UserIcon />,
              headerTintColor: theme.colors.onSurfaceVariant,
              headerStyle: {
                backgroundColor: theme.colors.surfaceVariant,
              },
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={Chat}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.surfaceVariant,
              },
              headerTitle: () => <ChatScreenHeader />,
            }}
          />
        </Stack.Navigator>
      </ChatContextProvider>
    </ChatsContextProvider>
  );
}
