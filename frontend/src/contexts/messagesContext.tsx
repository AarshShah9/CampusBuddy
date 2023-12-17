import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { 
    FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { initializeApp } from "firebase/app";
import { 
    getFirestore, collection, query, orderBy, FirestoreDataConverter, getDocs,
    WithFieldValue, QueryDocumentSnapshot, SnapshotOptions, where, limit, 
    FirestoreError, QuerySnapshot, DocumentData, or, onSnapshot, and, 
    CollectionReference, Query, startAfter } from "firebase/firestore";
import { ConversationObject, FirestoreConversationObject, FirestoreMessageObject, MessageObject } from '~/types/Chat';
import useAuthContext from '~/hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { UserDataType } from '~/types/User';
import { getSortedKey, initialNumberOfConversations, initialNumberOfMessages } from '~/lib/helperFunctions';

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

type OpenedConversation = { 
    status: 'opened', 
    messagesRef: CollectionReference<MessageObject, FirestoreMessageObject>,
    messagesQuery: Query<MessageObject, FirestoreMessageObject>,
    listener: any,
    messages: MessageObject[],
    endReached: boolean,
    firstRender: boolean
}
type OpenedConversations = { 
    [key: string]: (OpenedConversation | { status: 'not-opened' })  
}

type contextObject = { 
    user: UserDataType,
    conversations: ConversationObject[],
    fetchMoreConversations: () => void,
    openConversation: (arg: string) => void,
    openedConversations: OpenedConversations,
    fetchMoreMessages: (arg: string) => Promise<void>,
    conversationsAreLoading: boolean
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
        const { senderId, receiverId, message, createdAt } = data;
        return {
            id: snapshot.id,
            senderId, 
            receiverId,
            message,
            createdAt
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
        const { participants, numUnreadMessages, lastMessage, createdAt, updatedAt } = data;
        return {
            id: snapshot.id,
            participants,
            numUnreadMessages, 
            lastMessage,
            createdAt,
            updatedAt
        };
    },
};


type ProviderProps = PropsWithChildren<{
    conversationsAreLoading: boolean,
    user: UserDataType
    conversations: ConversationObject[],
    conversationPairs: string[],
    fetchMoreConversations: () => void
}>;
const ProviderComponent = ({ children, user, conversations, conversationPairs, fetchMoreConversations, conversationsAreLoading }: ProviderProps) => {
    const { id : currentUserId } = user;

    const [openedConversations, setOpenedConversations] = useState<OpenedConversations>({});

    const updateOpenedConversations = useCallback((conversations: string[]) => {
        let objectKeys = Object.keys(openedConversations);

        let added = conversations.filter(convKey => !objectKeys.includes(convKey));
        let deleted = objectKeys.filter(convKey => !conversations.includes(convKey));
        let unchanged = objectKeys.filter(convKey => conversations.includes(convKey));

        if(added.length > 0 || deleted.length > 0) {
            let fullList = [...unchanged, ...added];

            deleted.forEach(key => {
                const conversation = openedConversations[key];
                if(conversation.status === 'opened')
                    conversation.listener();
            })

            setOpenedConversations(old => {
                let oldObjectKeys = Object.keys(old);
                let newObj: OpenedConversations = {};
                fullList.forEach(key => {
                    if(oldObjectKeys.includes(key))
                        newObj[key] = old[key];
                    else
                        newObj[key] = { status: 'not-opened' }
                })

                return newObj;
            })
        }
    }, [openedConversations])

    useEffect(() => {
        updateOpenedConversations(conversationPairs);
    }, [conversationPairs])

    const unsubscribeAllListeners = useCallback(() => {
        Object.keys(openedConversations).forEach(key => {
            const conversation = openedConversations[key];
            if(conversation.status === 'opened')
                conversation.listener();
        })
    }, [openedConversations])

    useEffect(() => {
        return () => {
            unsubscribeAllListeners()
        }
    }, [])

    const fetchMoreMessages = useCallback(async (otherEndUserId: string) => {
        const conversationKey = getSortedKey(currentUserId, otherEndUserId);
        const conversation = openedConversations[conversationKey] as OpenedConversation;

        if(!conversation.endReached) {
            const { messages } = conversation;

            const results = await getDocs(
                query(
                    conversation.messagesQuery, 
                    startAfter(messages[messages.length - 1]),
                    limit(initialNumberOfMessages)
                )
            )

            const nextMessages = results.docs.map(doc => doc.data());
            setOpenedConversations(old => {
                let newOpenedConversations = {...old};
                const oldConversationObject = old[conversationKey] as OpenedConversation;

                let newConversationObject: OpenedConversation = {
                    status: 'opened',
                    messagesRef: oldConversationObject.messagesRef,
                    messagesQuery: oldConversationObject.messagesQuery,
                    listener: oldConversationObject.listener,
                    messages: [
                        ...oldConversationObject.messages,
                        ...nextMessages
                    ],
                    endReached: results.docs.length < initialNumberOfMessages,
                    firstRender: false
                }
                newOpenedConversations[conversationKey] = newConversationObject;
                return newOpenedConversations;
            })
        }
    }, [currentUserId, openedConversations, setOpenedConversations])

    const openConversation = useCallback((otherEndUserId: string) => {
        const conversationKey = getSortedKey(currentUserId, otherEndUserId);
        const conversation = openedConversations[conversationKey];
        
        if(conversation.status === 'not-opened') {
            setOpenedConversations(old => {
                let newOpenedConversations = {...old};
                
                const messagesRef = collection(firestore, 'messages').withConverter(messageConverter);
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
                    messagesRef,
                    messagesQuery,
                    listener: onSnapshot(
                        query(messagesQuery, limit(initialNumberOfMessages)), 
                        (snapshot) => {                            
                            setOpenedConversations(old => {
                                let newOpenedConversations = {...old};
                                const oldConversationObject = old[conversationKey] as OpenedConversation;
                                
                                const items = oldConversationObject.firstRender ? 
                                snapshot.docs.map(item => item.data()) : 
                                snapshot.docChanges().map(item => item.doc.data());
                                
                                // Still in testing so these logs will be used again soon
                                //console.log('how many docs in old conv messages', oldConversationObject.messages.length)
                                //console.log('how many docs in snap docs', snapshot.docs.length)
                                //console.log('how many docs in snap doc changes', snapshot.docChanges().length)
                                //console.log('how many docs in items', items.length)

                                newOpenedConversations[conversationKey] = {
                                    status: 'opened',
                                    messagesQuery: oldConversationObject.messagesQuery,
                                    messagesRef: oldConversationObject.messagesRef,
                                    listener: oldConversationObject.listener,
                                    messages: [
                                        ...items,
                                        ...oldConversationObject.messages
                                    ],
                                    endReached: snapshot.docs.length < initialNumberOfMessages,
                                    firstRender: false
                                };
                                return newOpenedConversations
                            });
                        }
                    ),
                    messages: [],
                    endReached: false,
                    firstRender: true
                };
                newOpenedConversations[conversationKey] = newConversationObject;
                return newOpenedConversations;
            })
        }
    }, [currentUserId, openedConversations, setOpenedConversations])

    return (
        <MessagesContext.Provider 
            value={{ 
                user, conversations, fetchMoreConversations, conversationsAreLoading,
                openConversation, openedConversations, fetchMoreMessages 
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
        <ProviderComponent user={user} 
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