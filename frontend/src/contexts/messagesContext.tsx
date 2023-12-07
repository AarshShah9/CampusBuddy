import type { PropsWithChildren } from 'react';
import { createContext } from 'react';
import { 
    FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { initializeApp } from "firebase/app";
import { 
    getFirestore, collection, query, orderBy, FirestoreDataConverter, 
    WithFieldValue, QueryDocumentSnapshot, SnapshotOptions, where, or } from "firebase/firestore";
import { ChatListItem, FirestoreMessageObject, MessageObject } from '~/types/Chat';

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

type contextObject = { 
    messages: MessageObject[],
    chatList: ChatListItem[]
};
const MessagesContext = createContext<contextObject | null>(null);

const messageConverter: FirestoreDataConverter<MessageObject, FirestoreMessageObject> = {
    toFirestore(doc: WithFieldValue<MessageObject>) {
        const { id, ...payLoad } = doc as MessageObject;
        return payLoad;
    },
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ) {
        const data = snapshot.data(options);
        return {
            id: snapshot.id,
            senderId: data.senderId, 
            receiverId: data.receiverId,
            message: data.message,
            createdAt: data.createdAt
        };
    },
};

const getConversations = (messages: MessageObject[], userId: string) =>  {
    const result = {} as ({ [key: string]: MessageObject[] });
    messages.forEach(message => {
        const { senderId, receiverId } = message;
        let key = userId === senderId ? 
        `${senderId}${receiverId}` : `${receiverId}${senderId}`;
        if(Object.keys(result).includes(key))
            result[key].push(message);
        else
            result[key] = [message];
    });
    return result
}

export const MessagesContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const currentUserId = '1'; // mocked for now, but will be obtained from authContext

    const messagesRef = collection(firestore, 'messages').withConverter(messageConverter);
    const orderedQuery = query(
        messagesRef, 
        or(
            where("senderId", "==", currentUserId),
            where("receiverId", "==", currentUserId)
        ), 
        //orderBy('createdAt', 'asc')
    );
    
    const [messages, loading, error] = useCollectionData(orderedQuery);
    console.log('messages', messages) 
    const conversations = messages ? getConversations(messages, currentUserId) : {};
    console.log('conversations', conversations)
    const chatList = Object.keys(conversations).map(key => {
        return ({ 
            userId: key.replace(currentUserId, ""), 
            lastMessage: conversations[key][conversations[key].length - 1].message.content,
            numUnreadMessages: conversations[key].filter(message => 
                (!message.timeRead) && (message.receiverId === currentUserId)
            ).length
        })
    });

    return (
        <MessagesContext.Provider value={{ messages: messages ?? [], chatList }}>
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesContext;