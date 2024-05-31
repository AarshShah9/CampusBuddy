import { useState, useCallback, useEffect } from "react";
import {
    View,
    StyleSheet,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { FlashList } from "@shopify/flash-list";
import useThemeContext from "~/hooks/useThemeContext";
import { Ionicons } from "@expo/vector-icons";
import Message from "../components/Message";
import ListLoader from "../components/ListLoader";
import { initialNumberOfMessages } from "~/lib/helperFunctions";
import { ActivityIndicator } from "react-native-paper";
import { useRoute } from "@react-navigation/native";
import useChatContext from "~/hooks/useChatContext";
import useAppContext from "~/hooks/useAppContext";
import { OpenedConversation } from "~/types/Chat";

function UnOpenedConversationComponent({ otherEndUserId }: { otherEndUserId: string }) {
    const { startConversation } = useChatContext();

    useEffect(() => {
        startConversation(otherEndUserId);
    }, [])

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator size={"large"} />
        </View>
    )
}

function OpenedConversationComponent({ conversation, otherEndUserId }: {
    conversation: OpenedConversation,
    otherEndUserId: string
}) {
    const { user, fetchMoreMessages, updateMessagesReadStatus } = useChatContext();

    const { id: currentUserId } = user;

    const { messages } = conversation;

    useEffect(() => {
        updateMessagesReadStatus(otherEndUserId);
    }, [messages]);

    const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);

    const [moreDataFetchingAllowed, setMoreDataFetchingAllowed] = useState(false);
    const allowMoreDataFetching = useCallback(() => {
        setMoreDataFetchingAllowed(true);
    }, []);

    const getMoreMessages = () => {
        if (moreDataFetchingAllowed && messages.length >= initialNumberOfMessages) {
            setIsLoadingMoreData(true);
            fetchMoreMessages(otherEndUserId).then(() => {
                setIsLoadingMoreData(false);
            });
        }
    };

    return (
        <View style={styles.messagesArea}>
            <View style={{ flex: 1 }}>
                <FlashList
                    onScroll={allowMoreDataFetching}
                    ListFooterComponent={() => (
                        <ListLoader isLoading={isLoadingMoreData} />
                    )}
                    inverted
                    estimatedItemSize={40}
                    data={messages}
                    renderItem={({ index, item: message }) => {
                        let previousIsOwner =
                            index === 0
                                ? false
                                : messages[index - 1].senderId === currentUserId;
                        let currentIsOwner = message.senderId === currentUserId;
                        return (
                            <Message
                                message={message.message}
                                isSender={currentIsOwner}
                                consecutive={
                                    index === 0 ? false : previousIsOwner === currentIsOwner
                                }
                            />
                        );
                    }}
                    onEndReached={getMoreMessages}
                    onEndReachedThreshold={0}
                />
            </View>
        </View>
    );
}

function ListArea({ otherEndUserId }: { otherEndUserId: string }) {
    const { getConversation } = useChatContext();

    const conversation = getConversation(otherEndUserId);

    if (!conversation || conversation.status === "not-opened")
        return <UnOpenedConversationComponent otherEndUserId={otherEndUserId} />

    return <OpenedConversationComponent conversation={conversation} otherEndUserId={otherEndUserId} />
}

function TypingArea({ otherEndUserId }: { otherEndUserId: string }) {
    const { theme, inDarkMode } = useThemeContext();
    const themedTextInputStyle = inDarkMode
        ? {
            backgroundColor: "grey",
            color: "white",
        }
        : {
            backgroundColor: "white",
            color: "black",
        };

    const { createNewMessage } = useChatContext();

    const [message, setMessage] = useState("");

    const { dismissKeyboard } = useAppContext();

    const handleSendMessage = async () => {
        setMessage("");
        dismissKeyboard();
        if (message.trim().length > 0)
            await createNewMessage(otherEndUserId, message);
    };

    return (
        <View
            style={[
                styles.typingArea,
                { backgroundColor: theme.colors.surfaceVariant },
            ]}
        >
            <View style={styles.typingAreaInner}>
                <TextInput
                    multiline
                    style={[styles.textInput, themedTextInputStyle]}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity onPress={handleSendMessage}>
                    <Ionicons name="send" size={30} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

function ChatComponent({ otherEndUserId }: { otherEndUserId: string }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 87 : 0}
            style={{ flex: 1 }}
        >
            <View style={{ flex: 1 }}>
                <ListArea otherEndUserId={otherEndUserId} />
                <TypingArea otherEndUserId={otherEndUserId} />
            </View>
        </KeyboardAvoidingView>
    );
}

export default function ChatScreen() {
    const { params } = useRoute<any>();

    if (params && params.userId)
        return <ChatComponent otherEndUserId={params.userId} />;

    return null;
}

const styles = StyleSheet.create({
    messagesArea: {
        flex: 1,
        paddingHorizontal: 10
    },
    typingArea: {
        paddingTop: 6,
    },
    typingAreaInner: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 40,
    },
    textInput: {
        fontSize: 17.6,
        paddingHorizontal: 12,
        paddingBottom: 5,
        marginRight: 15,
        width: "80%",
        borderColor: "gray",
        borderWidth: 1,
        borderRadius: 24,
    },
});
