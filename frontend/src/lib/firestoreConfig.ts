import { 
    FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, 
    FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGING_SENDER_ID, FIREBASE_APP_ID 
} from '@env';
import { initializeApp } from 'firebase/app';
import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions, WithFieldValue, getFirestore } from 'firebase/firestore';
import { ConversationObject, FirestoreConversationObject, FirestoreMessageObject, MessageObject } from '~/types/Chat';

const firebaseConfig = {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID
};
  
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);

export const messageConverter: FirestoreDataConverter<MessageObject, FirestoreMessageObject> = {
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

export const conversationConverter: FirestoreDataConverter<ConversationObject, FirestoreConversationObject> = {
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