import type { PropsWithChildren } from 'react';
import { createContext } from 'react';
import { 
    FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET,
    FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID } from '@env';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, query, orderBy, FirestoreDataConverter, WithFieldValue, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { FirestoreMessageObject, MessageObject } from '~/types/Chat';

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

type contextObject = { messages: MessageObject[] };
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

export const MessagesContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const messagesRef = collection(firestore, 'messages').withConverter(messageConverter);
    const orderedQuery = query(messagesRef, orderBy('createdAt', 'asc'));
    
    const [messages, loading, error] = useCollectionData(orderedQuery);

    return (
        <MessagesContext.Provider value={{ messages: messages ?? [] }}>
            {children}
        </MessagesContext.Provider>
    )
}

export default MessagesContext;