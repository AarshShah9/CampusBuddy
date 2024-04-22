import type { PropsWithChildren } from "react";
import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    collection,
    query,
    orderBy,
    getDocs,
    where,
    limit,
    or,
    onSnapshot,
    and,
    Query,
    startAfter,
    Unsubscribe,
    updateDoc,
    doc,
    serverTimestamp,
    addDoc,
    Timestamp,
} from "firebase/firestore";
import { FirestoreMessageObject, MessageObject } from "~/types/Chat";
import { UserDataType } from "~/types/User";
import { getSortedArray, initialNumberOfMessages } from "~/lib/helperFunctions";
import useChatsContext from "~/hooks/useChatsContext";
import {
    conversationConverter,
    firestore,
    messageConverter,
} from "~/lib/firestoreConfig";
import usePushNotifications from "~/hooks/usePushNotifications";

const getSortedKey = (arg1: string, arg2: string) =>
    getSortedArray(arg1, arg2).join("");

const currentIsFirstParticipant = (
    currentUserId: string,
    otherEndUserId: string,
) => {
    let result = getSortedArray(currentUserId, otherEndUserId)[0];
    return result === currentUserId;
};

type UnopenedConversation = { status: "not-opened" };
type OpenedConversation = {
    status: "opened";
    messagesQuery: Query<MessageObject, FirestoreMessageObject>;
    listener: Unsubscribe;
    messages: MessageObject[];
    endReached: boolean;
    firstTime: boolean;
};
type ConversationsCache = {
    [key: string]: OpenedConversation | UnopenedConversation;
};

type contextObject = {
    user: UserDataType;
    openConversation: (arg: string) => void;
    fetchMoreMessages: (arg: string) => Promise<void>;
    createNewMessage: (otherEndUserId: string, message: string) => Promise<void>;
    getConversation: (
        otherEndUserId: string,
    ) => OpenedConversation | UnopenedConversation;
    updateMessagesReadStatus: (arg: string) => void;
    getNumberOfUnreadMessages: (
        arg1: string,
        arg2: { firstParticipant: number; secondParticipant: number },
    ) => number;
};
const ChatContext = createContext<contextObject | null>(null);

export const ChatContextProvider = ({ children }: PropsWithChildren) => {
    // Getting the user from chats context since it wraps this context
    const { user, conversations, conversationsRef } = useChatsContext();

    // An array of strings which represents conversations, for example: ['user1-user2', 'user2-user5']
    const conversationPairs = conversations.map((conv) =>
        getSortedKey(conv.participants[0], conv.participants[1]),
    );

    const { id: currentUserId } = user;

    // memoizing the reference to the messages collection
    const messagesRef = useMemo(
        () => collection(firestore, "messages").withConverter(messageConverter),
        [],
    );

    // This is a custom cache which keeps track of opened chats so as to prevent recreating the realtime listeners
    const [conversationsCache, setConversationsCache] =
        useState<ConversationsCache>({});

    /**
     * Function to add, or delete an entry from the conversations cache
     * It takes in the conversations pairs as an argument because it's easier to detect conversation changes from it
     */
    const updateConversationsCache = useCallback(
        (conversations: string[]) => {
            let objectKeys = Object.keys(conversationsCache);

            // Splitting the changes into added, deleted and unchanged conversations
            let added = conversations.filter(
                (convKey) => !objectKeys.includes(convKey),
            );
            let deleted = objectKeys.filter(
                (convKey) => !conversations.includes(convKey),
            );
            let unchanged = objectKeys.filter((convKey) =>
                conversations.includes(convKey),
            );

            if (added.length > 0 || deleted.length > 0) {
                let fullList = [...unchanged, ...added];

                // If we are removing entries then we have to deactivate the listeners associated with the entries
                deleted.forEach((key) => {
                    const conversation = conversationsCache[key];
                    if (conversation.status === "opened") conversation.listener();
                });

                setConversationsCache((old) => {
                    let oldObjectKeys = Object.keys(old);
                    let newObj: ConversationsCache = {};
                    fullList.forEach((key) => {
                        if (oldObjectKeys.includes(key)) newObj[key] = old[key];
                        else newObj[key] = { status: "not-opened" };
                    });

                    return newObj;
                });
            }
        },
        [conversationsCache],
    );

    useEffect(() => {
        updateConversationsCache(conversationPairs);
    }, [conversationPairs]);

    const unsubscribeAllListeners = useCallback(() => {
        Object.keys(conversationsCache).forEach((key) => {
            const conversation = conversationsCache[key];
            if (conversation.status === "opened") conversation.listener();
        });
    }, [conversationsCache]);

    useEffect(() => {
        return () => {
            unsubscribeAllListeners();
        };
    }, []);

    /**
     * Function to fetch more messages of a certain conversation
     */
    const fetchMoreMessages = useCallback(
        async (otherEndUserId: string) => {
            const conversationKey = getSortedKey(currentUserId, otherEndUserId);
            const conversation = conversationsCache[
                conversationKey
            ] as OpenedConversation;

            // Only retrieve more documents if there are any more to be retrieved
            // Doing this prevents an infinite cycle since without this firestore will circle back to beginning
            if (!conversation.endReached) {
                const { messages } = conversation;

                const results = await getDocs(
                    query(
                        conversation.messagesQuery,
                        startAfter(messages[messages.length - 1].createdAt),
                        limit(initialNumberOfMessages),
                    ),
                );

                const nextMessages = results.docs.map((doc) => doc.data());
                setConversationsCache((old) => {
                    let newConversationsCache = { ...old };
                    const oldConversationObject = old[
                        conversationKey
                    ] as OpenedConversation;

                    let newConversationObject: OpenedConversation = {
                        status: "opened",
                        messagesQuery: oldConversationObject.messagesQuery,
                        listener: oldConversationObject.listener,
                        messages: [...oldConversationObject.messages, ...nextMessages],
                        endReached: results.docs.length < initialNumberOfMessages,
                        firstTime: oldConversationObject.firstTime
                    };
                    newConversationsCache[conversationKey] = newConversationObject;
                    return newConversationsCache;
                });
            }
        },
        [currentUserId, conversationsCache, setConversationsCache],
    );

    const { sendLocalNotification } = usePushNotifications();

    /**
     * Function to set up a realtime listener and register it into the conversations cache
     */
    const openConversation = useCallback(
        (otherEndUserId: string) => {
            const conversationKey = getSortedKey(currentUserId, otherEndUserId);
            const conversation = conversationsCache[conversationKey];

            if (conversation.status === "not-opened") {
                setConversationsCache((old) => {
                    let newConversationsCache = { ...old };

                    const messagesQuery = query(
                        messagesRef,
                        or(
                            and(
                                where("senderId", "==", currentUserId),
                                where("receiverId", "==", otherEndUserId),
                            ),
                            and(
                                where("senderId", "==", otherEndUserId),
                                where("receiverId", "==", currentUserId),
                            ),
                        ),
                        orderBy("createdAt", "desc"),
                    );

                    let newConversationObject: OpenedConversation = {
                        status: "opened",
                        messagesQuery,
                        listener: onSnapshot(
                            query(messagesQuery, limit(initialNumberOfMessages)),
                            (snapshot) => {
                                setConversationsCache((old) => {
                                    let newConversationsCache = { ...old };
                                    const oldConversationObject = old[
                                        conversationKey
                                    ] as OpenedConversation;

                                    if(!oldConversationObject.firstTime){
                                        sendLocalNotification({
                                            title: `New Mesage from ${otherEndUserId}`,
                                            body: `You have a new message`,
                                        }).catch((error) =>
                                            console.log(
                                                "An error occured when trying to send a notification:\n",
                                                error,
                                            ),
                                        );
                                    }

                                    const items = snapshot
                                        .docChanges()
                                        .filter((item) => item.type === "added")
                                        .map((item) => item.doc.data());

                                    newConversationsCache[conversationKey] = {
                                        status: "opened",
                                        messagesQuery: oldConversationObject.messagesQuery,
                                        listener: oldConversationObject.listener,
                                        messages: [...items, ...oldConversationObject.messages],
                                        endReached: oldConversationObject.endReached,
                                        firstTime: false
                                    };
                                    return newConversationsCache;
                                });
                            },
                        ),
                        messages: [],
                        endReached: false,
                        firstTime: true
                    };
                    newConversationsCache[conversationKey] = newConversationObject;
                    return newConversationsCache;
                });
            }
        },
        [currentUserId, conversationsCache, setConversationsCache, sendLocalNotification],
    );

    /**
     * Function to retrieve a conversation cache entry
     */
    const getConversation = useCallback(
        (otherEndUserId: string) => {
            return conversationsCache[getSortedKey(currentUserId, otherEndUserId)];
        },
        [conversationsCache],
    );

    /**
     * Function to create a new message and create/update the conversation object associated to it
     */
    const createNewMessage = useCallback(
        async (otherEndUserId: string, message: string) => {
            await addDoc(messagesRef, {
                id: "",
                senderId: currentUserId,
                receiverId: otherEndUserId,
                message: {
                    type: "text",
                    content: message,
                },
                createdAt: serverTimestamp(),
                timeRead: null,
            });
            const conversation = conversations.find((conv) => {
                return (
                    getSortedKey(conv.participants[0], conv.participants[1]) ===
                    getSortedKey(currentUserId, otherEndUserId)
                );
            });
            if (conversation) {
                if (currentIsFirstParticipant(currentUserId, otherEndUserId))
                    await updateDoc(
                        doc(firestore, "conversations", conversation.id).withConverter(
                            conversationConverter,
                        ),
                        {
                            lastMessage: message,
                            "unreadMessages.secondParticipant":
                                conversation.unreadMessages.secondParticipant + 1,
                            updatedAt: serverTimestamp(),
                        },
                    );
                else
                    await updateDoc(
                        doc(firestore, "conversations", conversation.id).withConverter(
                            conversationConverter,
                        ),
                        {
                            lastMessage: message,
                            "unreadMessages.firstParticipant":
                                conversation.unreadMessages.firstParticipant + 1,
                            updatedAt: serverTimestamp(),
                        },
                    );
            } else {
                let timestamp = serverTimestamp();
                if (currentIsFirstParticipant(currentUserId, otherEndUserId))
                    await addDoc(conversationsRef, {
                        id: "",
                        unreadMessages: {
                            firstParticipant: 0,
                            secondParticipant: 1,
                        },
                        participants: [currentUserId, otherEndUserId],
                        lastMessage: message,
                        createdAt: timestamp,
                        updatedAt: timestamp,
                    });
                else
                    await addDoc(conversationsRef, {
                        id: "",
                        unreadMessages: {
                            firstParticipant: 1,
                            secondParticipant: 0,
                        },
                        participants: [currentUserId, otherEndUserId],
                        lastMessage: message,
                        createdAt: timestamp,
                        updatedAt: timestamp,
                    });
            }
            //await /api/notifyUser?userId=${otherEndUserId}
        },
        [conversations],
    );

    /**
     * Function to update messages read status
     * Iterates through all messages that have not been read and updates them
     * Also updates the conversation object associated
     */
    const updateMessagesReadStatus = useCallback(
        async (otherEndUserId: string) => {
            const currentTime = Timestamp.now();
            const promises = (
                await getDocs(
                    query(
                        messagesRef,
                        and(
                            and(
                                where("senderId", "==", otherEndUserId),
                                where("receiverId", "==", currentUserId),
                            ),
                            where("timeRead", "==", null),
                        ),
                    ),
                )
            ).docs
                .map((doc) => doc.data())
                .map((message) =>
                    updateDoc(
                        doc(firestore, "messages", message.id).withConverter(
                            messageConverter,
                        ),
                        {
                            timeRead: currentTime,
                        },
                    ),
                );

            await Promise.all(promises).catch((err) =>
                console.error(
                    "an error occured while updating messages read status",
                    err,
                ),
            );

            const conversation = conversations.find((conv) => {
                return (
                    getSortedKey(conv.participants[0], conv.participants[1]) ===
                    getSortedKey(currentUserId, otherEndUserId)
                );
            });

            if (conversation) {
                if (currentIsFirstParticipant(currentUserId, otherEndUserId)) {
                    conversation.unreadMessages.firstParticipant !== 0 &&
                        (await updateDoc(
                            doc(firestore, "conversations", conversation.id).withConverter(
                                conversationConverter,
                            ),
                            {
                                "unreadMessages.firstParticipant": 0,
                            },
                        ));
                } else {
                    conversation.unreadMessages.secondParticipant !== 0 &&
                        (await updateDoc(
                            doc(firestore, "conversations", conversation.id).withConverter(
                                conversationConverter,
                            ),
                            {
                                "unreadMessages.secondParticipant": 0,
                            },
                        ));
                }
            }
        },
        [currentUserId, conversations],
    );

    /**
     * Function which computes the number of unread messages for the current user
     */
    const getNumberOfUnreadMessages = useCallback(
        (
            otherEndUserId: string,
            unreadMessages: {
                firstParticipant: number;
                secondParticipant: number;
            },
        ) => {
            if (currentIsFirstParticipant(currentUserId, otherEndUserId))
                return unreadMessages.firstParticipant;
            return unreadMessages.secondParticipant;
        },
        [currentUserId],
    );

    return (
        <ChatContext.Provider
            value={{
                user,
                openConversation,
                fetchMoreMessages,
                updateMessagesReadStatus,
                createNewMessage,
                getConversation,
                getNumberOfUnreadMessages,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export default ChatContext;