import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { 
    FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';
import { initializeApp } from "firebase/app";
import { 
    getFirestore, collection, query, orderBy, FirestoreDataConverter, getDocs,
    WithFieldValue, QueryDocumentSnapshot, SnapshotOptions, where, limit, 
    or, onSnapshot, and, CollectionReference, Query, startAfter, 
    Unsubscribe, updateDoc, doc, serverTimestamp, addDoc, Timestamp, getCountFromServer } from "firebase/firestore";
import { ConversationObject, FirestoreConversationObject, FirestoreMessageObject, MessageObject } from '~/types/Chat';
import useAuthContext from '~/hooks/useAuthContext';
import { UserDataType } from '~/types/User';
import { getSortedArray, initialNumberOfConversations, initialNumberOfMessages } from '~/lib/helperFunctions';

const getSortedKey = (arg1: string, arg2: string) => getSortedArray(arg1, arg2).join('')

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

type UnopenedConversation = { status: 'not-opened' }

type OpenedConversation = { 
    status: 'opened', 
    messagesQuery: Query<MessageObject, FirestoreMessageObject>,
    listener: Unsubscribe,
    messages: MessageObject[],
    endReached: boolean
}

type ConversationsCache = { 
    [key: string]: (OpenedConversation | UnopenedConversation)  
}

type contextObject = { 
    filterWord: string,
    setFilterWord: (arg: string) => void,
    user: UserDataType,
    conversations: ConversationObject[],
    fetchMoreConversations: () => void,
    openConversation: (arg: string) => void,
    fetchMoreMessages: (arg: string) => Promise<void>,
    conversationsAreLoading: boolean,
    createNewMessage: (otherEndUserId: string, message: string) => Promise<void>,
    getConversation: (otherEndUserId: string) => OpenedConversation | UnopenedConversation,
    updateMessagesReadStatus: (arg: string) => void,
    getNumberOfUnreadMessages: (arg1: string, arg2: { firstParticipant: number, secondParticipant: number }) => number
};
const MessagesContext = createContext<contextObject | null>(null);

const messageConverter: FirestoreDataConverter<MessageObject, FirestoreMessageObject> = {
    toFirestore(doc: WithFieldValue<MessageObject>) {
        const { id, ...payLoad } = doc as MessageObject;
        return payLoad;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot<MessageObject, FirestoreMessageObject>,
      options: SnapshotOptions
    ) {
        const data = snapshot.data(options);
        const { senderId, receiverId, message, createdAt, timeRead } = data;
        return {
            id: snapshot.id,
            senderId, 
            receiverId,
            message,
            createdAt,
            timeRead,
        };
    },
};

const conversationConverter: FirestoreDataConverter<ConversationObject, FirestoreConversationObject> = {
    toFirestore(doc: WithFieldValue<ConversationObject>) {
        const { id, ...payLoad } = doc as ConversationObject;
        return payLoad;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot<ConversationObject, FirestoreConversationObject>,
      options: SnapshotOptions
    ) {
        const data = snapshot.data(options);
        const { participants, unreadMessages, lastMessage, createdAt, updatedAt } = data;
        return {
            id: snapshot.id,
            participants,
            unreadMessages, 
            lastMessage,
            createdAt,
            updatedAt
        };
    },
};

const currentIsFirstParticipant = (currentUserId: string, otherEndUserId: string) => {
    let result = getSortedArray(currentUserId, otherEndUserId)[0];
    return (result === currentUserId)
}

type ProviderProps = PropsWithChildren<{
    conversationsAreLoading: boolean,
    user: UserDataType
    conversations: ConversationObject[],
    conversationPairs: string[],
    fetchMoreConversations: () => void,
    conversationsRef: CollectionReference<ConversationObject, FirestoreConversationObject>
}>;
const ProviderComponent = (props: ProviderProps) => {
    const { user } = props;
    const { id : currentUserId } = user;

    const messagesRef = useMemo(() => collection(firestore, 'messages').withConverter(messageConverter), []);
    
    const [conversationsCache, setConversationsCache] = useState<ConversationsCache>({});

    const updateConversationsCache = useCallback((conversations: string[]) => {
        let objectKeys = Object.keys(conversationsCache);

        let added = conversations.filter(convKey => !objectKeys.includes(convKey));
        let deleted = objectKeys.filter(convKey => !conversations.includes(convKey));
        let unchanged = objectKeys.filter(convKey => conversations.includes(convKey));

        if(added.length > 0 || deleted.length > 0) {
            let fullList = [...unchanged, ...added];

            deleted.forEach(key => {
                const conversation = conversationsCache[key];
                if(conversation.status === 'opened')
                    conversation.listener();
            })

            setConversationsCache(old => {
                let oldObjectKeys = Object.keys(old);
                let newObj: ConversationsCache = {};
                fullList.forEach(key => {
                    if(oldObjectKeys.includes(key))
                        newObj[key] = old[key];
                    else
                        newObj[key] = { status: 'not-opened' }
                })

                return newObj;
            })
        }
    }, [conversationsCache])

    const { conversationPairs } = props;

    useEffect(() => {
        updateConversationsCache(conversationPairs);
    }, [conversationPairs])

    const unsubscribeAllListeners = useCallback(() => {
        Object.keys(conversationsCache).forEach(key => {
            const conversation = conversationsCache[key];
            if(conversation.status === 'opened')
                conversation.listener();
        })
    }, [conversationsCache])

    useEffect(() => {
        return () => {
            unsubscribeAllListeners()
        }
    }, [])

    const fetchMoreMessages = useCallback(async (otherEndUserId: string) => {
        const conversationKey = getSortedKey(currentUserId, otherEndUserId);
        const conversation = conversationsCache[conversationKey] as OpenedConversation;

        if(!conversation.endReached) {
            const { messages } = conversation;
    
            const results = await getDocs(
                query(
                    conversation.messagesQuery, 
                    startAfter(messages[messages.length - 1].createdAt),
                    limit(initialNumberOfMessages)
                )
            )

            const nextMessages = results.docs.map(doc => doc.data());
            setConversationsCache(old => {
                let newConversationsCache = {...old};
                const oldConversationObject = old[conversationKey] as OpenedConversation;

                let newConversationObject: OpenedConversation = {
                    status: 'opened',
                    messagesQuery: oldConversationObject.messagesQuery,
                    listener: oldConversationObject.listener,
                    messages: [
                        ...oldConversationObject.messages,
                        ...nextMessages
                    ],
                    endReached: results.docs.length < initialNumberOfMessages
                }
                newConversationsCache[conversationKey] = newConversationObject;
                return newConversationsCache;
            })
        }
    }, [currentUserId, conversationsCache, setConversationsCache])

    const openConversation = useCallback((otherEndUserId: string) => {
        const conversationKey = getSortedKey(currentUserId, otherEndUserId);
        const conversation = conversationsCache[conversationKey];
        
        if(conversation.status === 'not-opened') {
            setConversationsCache(old => {
                let newConversationsCache = {...old};
                
                const messagesQuery = query(
                    messagesRef, 
                    or(
                        and(where("senderId", "==", currentUserId), where("receiverId", "==", otherEndUserId)),
                        and(where("senderId", "==", otherEndUserId), where("receiverId", "==", currentUserId))
                    ),
                    orderBy('createdAt', 'desc')
                );

                let newConversationObject: OpenedConversation = {
                    status: 'opened',
                    messagesQuery,
                    listener: onSnapshot(
                        query(messagesQuery, limit(initialNumberOfMessages)), 
                        (snapshot) => {                            
                            setConversationsCache(old => {
                                let newConversationsCache = {...old};
                                const oldConversationObject = old[conversationKey] as OpenedConversation;
                                
                                const items = snapshot.docChanges()
                                .filter(item => item.type === 'added')
                                .map(item => item.doc.data());

                                newConversationsCache[conversationKey] = {
                                    status: 'opened',
                                    messagesQuery: oldConversationObject.messagesQuery,
                                    listener: oldConversationObject.listener,
                                    messages: [
                                        ...items,
                                        ...oldConversationObject.messages
                                    ],
                                    endReached: oldConversationObject.endReached
                                };
                                return newConversationsCache
                            });
                        }
                    ),
                    messages: [],
                    endReached: false
                };
                newConversationsCache[conversationKey] = newConversationObject;
                return newConversationsCache;
            })
        }
    }, [currentUserId, conversationsCache, setConversationsCache])

    const getConversation = useCallback((otherEndUserId: string) => {
        return conversationsCache[getSortedKey(currentUserId, otherEndUserId)];
    }, [conversationsCache])
    
    const { conversations, conversationsRef } = props;

    const createNewMessage = useCallback(async (otherEndUserId: string, message: string) => {
        await addDoc(messagesRef, {
            id: '',
            senderId: currentUserId,
            receiverId: otherEndUserId,
            message: {
                type: 'text',
                content: message
            },
            createdAt: serverTimestamp(),
            timeRead: null
        })
        const conversation = conversations.find(conv => {
            return (getSortedKey(conv.participants[0], conv.participants[1]) ===
            getSortedKey(currentUserId, otherEndUserId))
        })
        if(conversation) {                
            if(currentIsFirstParticipant(currentUserId, otherEndUserId))
                await updateDoc(doc(firestore, 'conversations', conversation.id).withConverter(conversationConverter), {
                    lastMessage: message,
                    "unreadMessages.secondParticipant": conversation.unreadMessages.secondParticipant + 1,
                    updatedAt: serverTimestamp()
                })
            else
                await updateDoc(doc(firestore, 'conversations', conversation.id).withConverter(conversationConverter), {
                    lastMessage: message,
                    "unreadMessages.firstParticipant": conversation.unreadMessages.firstParticipant + 1,
                    updatedAt: serverTimestamp()
                })
        }
        else {
            let timestamp = serverTimestamp();
            if(currentIsFirstParticipant(currentUserId, otherEndUserId))
                await addDoc(conversationsRef, {
                    id: '',
                    unreadMessages: {
                        firstParticipant: 0,
                        secondParticipant: 1
                    },
                    participants: [currentUserId, otherEndUserId],
                    lastMessage: message,
                    createdAt: timestamp,
                    updatedAt: timestamp
                })
            else
                await addDoc(conversationsRef, {
                    id: '',
                    unreadMessages: {
                        firstParticipant: 1,
                        secondParticipant: 0
                    },
                    participants: [currentUserId, otherEndUserId],
                    lastMessage: message,
                    createdAt: timestamp,
                    updatedAt: timestamp
                })
        }
    }, [conversations])

    const updateMessagesReadStatus = useCallback(async (otherEndUserId: string) => {
        const currentTime = Timestamp.now();
        const promises = (await getDocs(
            query(
                messagesRef, 
                and(
                    and(where("senderId", "==", otherEndUserId), where("receiverId", "==", currentUserId)),
                    where("timeRead", '==', null)
                )
            )
        )).docs.map(doc => doc.data()).map(message => 
            updateDoc(doc(firestore, 'messages', message.id).withConverter(messageConverter), {
                timeRead: currentTime
            })
        )

        await Promise.all(promises).catch(err => console.error('an error occured while updating messages read status', err))

        const conversation = conversations.find(conv => {
            return (getSortedKey(conv.participants[0], conv.participants[1]) ===
            getSortedKey(currentUserId, otherEndUserId))
        })

        if(conversation) {
            if(currentIsFirstParticipant(currentUserId, otherEndUserId)) {
                (conversation.unreadMessages.firstParticipant !== 0) &&
                await updateDoc(doc(firestore, 'conversations', conversation.id).withConverter(conversationConverter), {
                    "unreadMessages.firstParticipant": 0
                })
            }
            else {
                (conversation.unreadMessages.secondParticipant !== 0) &&
                await updateDoc(doc(firestore, 'conversations', conversation.id).withConverter(conversationConverter), {
                    "unreadMessages.secondParticipant": 0
                })
            }
        }
    }, [currentUserId, conversations])

    const getNumberOfUnreadMessages = useCallback((
        otherEndUserId: string, 
        unreadMessages: {
            firstParticipant: number,
            secondParticipant: number
        }) => {
            if(currentIsFirstParticipant(currentUserId, otherEndUserId))
                return unreadMessages.firstParticipant
            return unreadMessages.secondParticipant
    }, [currentUserId])

    const [filterWord, setFilterWord] = useState('');
    const updateFilterWord = useCallback((arg: string) => {
        setFilterWord(arg)
    }, [])

    const { children, fetchMoreConversations, conversationsAreLoading } = props;  

    return (
        <MessagesContext.Provider 
            value={{ 
                user, conversations, fetchMoreConversations, conversationsAreLoading,
                openConversation, fetchMoreMessages, updateMessagesReadStatus,
                createNewMessage, getConversation, getNumberOfUnreadMessages,
                filterWord, setFilterWord: updateFilterWord
            }}
        >
            {children}
        </MessagesContext.Provider>
    )
}


type Props = PropsWithChildren<{
    user: UserDataType
}>;
function AuthenticatedProvider({ children, user }: Props) {
    const { id : currentUserId } = user;
    
    const [conversationsAreLoading, setConversationsAreLoading] = useState(true);

    const [endReached, setEndReached] = useState(false);
    const [documentsNeeded, setDocumentsNeeded] = useState(initialNumberOfConversations);
    const fetchMoreConversations = useCallback(() => {
        if(!endReached) {
            setConversationsAreLoading(true);
            setDocumentsNeeded(documentsNeeded => {
                return (documentsNeeded + initialNumberOfConversations);
            })
        }
    }, [endReached])

    const conversationsRef = useMemo(() => collection(firestore, 'conversations').withConverter(conversationConverter), []);
    const conversationsQuery = useMemo(() => query(
        conversationsRef, 
        where("participants", "array-contains", currentUserId),
        orderBy('updatedAt', 'desc')        
    ), []);

    const [conversations, setConversations] = useState<ConversationObject[]>([]);

    useEffect(() => {
        let subscriber = onSnapshot(
            query(conversationsQuery, limit(documentsNeeded)),
            (snapshot) => {
                let results = snapshot.docs.map(doc => doc.data());
                setConversations(results)
                setEndReached(results.length < documentsNeeded)
                setConversationsAreLoading(false)
            }
        )

        return () => {
            subscriber()
        }
    }, [documentsNeeded])

    return (
        <ProviderComponent user={user} conversationsRef={conversationsRef}
            conversationPairs={conversations.map(conv => getSortedKey(conv.participants[0], conv.participants[1]))} 
            conversations={conversations}
            conversationsAreLoading={conversationsAreLoading}
            fetchMoreConversations={fetchMoreConversations} 
        >
            {children}
        </ProviderComponent>
    )
} 


export const MessagesContextProvider = ({ children }: PropsWithChildren) => {
    const { user } = useAuthContext();
    if(!user) 
        return <>{children}</>

    return (
        <AuthenticatedProvider user={user}>
            {children}
        </AuthenticatedProvider>
    )
}

export default MessagesContext;