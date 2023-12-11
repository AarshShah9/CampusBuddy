import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useState } from 'react';
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
import { getSortedKey } from '~/lib/helperFunctions';

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
    queryRef: Query<MessageObject, FirestoreMessageObject>,
    listener: /* [
        MessageObject[] | undefined, 
        boolean, 
        FirestoreError | undefined, 
        QuerySnapshot<MessageObject, DocumentData> | undefined
    ] */ any,
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
    fetchMoreMessages: (arg: string) => Promise<void>
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

const initialNumberOfDocuments = 20;

const initializeOpenedConversations = (conversations: ConversationObject[]) => {
    let result: OpenedConversations = {};
    conversations.forEach(conv => {
        result[getSortedKey(conv.participants[0], conv.participants[1])] = { status: 'not-opened' }
        
    })
    //console.log('gonna be', result)
    return result;
}


type EmptyProviderProps = PropsWithChildren<{
    user: UserDataType
}>;
const EmptyProvider = ({ children, user }: EmptyProviderProps) => {
    const conversations: ConversationObject[] = [];
    const fetchMoreConversations = () => {};
    const openConversation = () => {};
    const openedConversations = {};
    const fetchMoreMessages = async () => {}

    return (
        <MessagesContext.Provider value={{ user, conversations, fetchMoreConversations, openConversation, openedConversations, fetchMoreMessages }}>
            {children}
        </MessagesContext.Provider>
    )
}

type CompleteProviderProps = EmptyProviderProps & PropsWithChildren<{
    conversations: ConversationObject[],
    fetchMoreConversations: () => void
}>;
const CompleteProvider = ({ children, user, conversations, fetchMoreConversations }: CompleteProviderProps) => {
    const { id : currentUserId } = user;

    const [openedConversations, setOpenedConversations] = useState(initializeOpenedConversations(conversations));
    //console.log('openedConversations', openedConversations)

    const fetchMoreMessages = useCallback(async (otherEndUserId: string) => {
        const conversationKey = getSortedKey(currentUserId, otherEndUserId);
        const conversation = openedConversations[conversationKey] as OpenedConversation;

        console.log('from fetcher, old conv is', conversation.status)

        if(!conversation.endReached) {
            const { messages } = conversation;

            const results = await getDocs(
                query(
                    conversation.queryRef, 
                    startAfter(messages[messages.length - 1]),
                    limit(15)
                )
            )

            const nextMessages = results.docs.map(doc => doc.data());
            setOpenedConversations(old => {
                let newOpenedConversations = {...old};
                const oldConversationObject = old[conversationKey] as OpenedConversation;

                let newConversationObject: OpenedConversation = {
                    status: 'opened',
                    messagesRef: oldConversationObject.messagesRef,
                    queryRef: oldConversationObject.queryRef,
                    listener: oldConversationObject.listener,
                    messages: [
                        ...oldConversationObject.messages,
                        ...nextMessages
                    ],
                    endReached: results.docs.length < 15,
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
                const queryRef = query(
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
                    queryRef,
                    listener: onSnapshot(
                        query(queryRef, limit(15)), 
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
                                    queryRef: oldConversationObject.queryRef,
                                    messagesRef: oldConversationObject.messagesRef,
                                    listener: oldConversationObject.listener,
                                    messages: [
                                        ...items,
                                        ...oldConversationObject.messages
                                    ],
                                    endReached: snapshot.docs.length < 15,
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
        <MessagesContext.Provider value={{ user, conversations, fetchMoreConversations, openConversation, openedConversations, fetchMoreMessages }}>
            {children}
        </MessagesContext.Provider>
    )
}

type Props = PropsWithChildren<{
    user: UserDataType
}>;
function AuthenticatedProvider({ children, user }: Props) {
    const { id : currentUserId } = user;
    
    const [documentsNeeded, setDocumentsNeeded] = useState(initialNumberOfDocuments);
    const fetchMoreConversations = useCallback(() => {
        setDocumentsNeeded(documentsNeeded => documentsNeeded + initialNumberOfDocuments)
    }, [setDocumentsNeeded])

    const conversationsRef = collection(firestore, 'conversations').withConverter(conversationConverter)
    const conversationsQuery = query(
        conversationsRef, 
        where("participants", "array-contains", currentUserId),
        orderBy('updatedAt', 'desc'),
        limit(documentsNeeded)
    );
    const [chats, loading, error] = useCollectionData(conversationsQuery);
    //const conversations = chats ?? [];

    if(!chats)
        return <EmptyProvider user={user} children={children} />

    return <CompleteProvider user={user} children={children} conversations={chats} fetchMoreConversations={fetchMoreConversations} />
} 

export const MessagesContextProvider = ({ children }: PropsWithChildren) => {
    const { user } = useAuthContext();
    if(!user) 
        return <>{children}</>

    return <AuthenticatedProvider children={children} user={user} />
}

export default MessagesContext;