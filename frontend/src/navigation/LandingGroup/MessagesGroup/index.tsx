import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chats from "~/screens/Chats";
import Chat from "~/screens/Chat";
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
        <Stack.Navigator 
          initialRouteName="ChatList" 
          screenOptions={{ headerTintColor: theme.colors.onSecondary }}
        >
          <Stack.Screen
            name="ChatList"
            component={Chats}
            options={{
              title: "Chats",
              /*  headerLeft: () => <DrawerIcon />,
                            headerRight: () => <UserIcon />, */
              headerTintColor: theme.colors.background,
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={Chat}
            options={{
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitle: () => <ChatScreenHeader />,
            }}
          />
        </Stack.Navigator>
      </ChatContextProvider>
    </ChatsContextProvider>
  );
}
