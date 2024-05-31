import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ReactQueryProvider from "~/contexts/queryContext";
import { EventsContextProvider } from "~/contexts/eventsContext";
import BottomTabsGroup from "./BottomTabsGroup";
import MessagesGroup from "./MessagesGroup";
import { ChatsContextProvider } from "~/contexts/chatsContext";
import { ChatContextProvider } from "~/contexts/chatContext";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ItemSettings from "~/screens/ItemSettings";
import PostSettings from "~/screens/PostSettings";
import { StripeProvider } from "@stripe/stripe-react-native";
import { PUBLISHABLE_KEY } from "@env";

const Stack = createNativeStackNavigator();

export default function LandingGroup() {
  return (
    <ReactQueryProvider>
      <StripeProvider
        publishableKey={PUBLISHABLE_KEY}
        merchantIdentifier="merchant.com.campusbuddy" // todo
        urlScheme="your-url-scheme" // todo
      >
        <BottomSheetModalProvider>
          <EventsContextProvider>
            <ChatsContextProvider>
              <ChatContextProvider>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen
                    name="BottomTabsGroup"
                    component={BottomTabsGroup}
                  />
                  <Stack.Screen name="Messages" component={MessagesGroup} />
                </Stack.Navigator>
              </ChatContextProvider>
            </ChatsContextProvider>
            <ItemSettings />
            <PostSettings />
          </EventsContextProvider>
        </BottomSheetModalProvider>
      </StripeProvider>
    </ReactQueryProvider>
  );
}
