import type { PropsWithChildren } from 'react';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { 
    collection, query, orderBy, where, limit,
    CollectionReference, DocumentData, onSnapshot
} from "firebase/firestore";
import { ConversationObject } from '~/types/Chat';
import useAuthContext from '~/hooks/useAuthContext';
import { UserDataType } from '~/types/User';
import { initialNumberOfConversations } from '~/lib/helperFunctions';
import { conversationConverter, firestore } from '~/lib/firestoreConfig';

type contextObject = { 
    user: UserDataType,
    conversationsRef: CollectionReference<DocumentData, DocumentData>,
    conversations: ConversationObject[],
    fetchMoreConversations: () => void,
    conversationsAreLoading: boolean
};
const ChatsContext = createContext<contextObject | null>(null);

type Props = PropsWithChildren<{
    user: UserDataType
}>;
function AuthenticatedProvider({ children, user }: Props) {
    const { id : currentUserId } = user;
    
    const conversationsRef = useMemo(() => collection(firestore, 'conversations').withConverter(conversationConverter), []);
    
    const conversationsQuery = useMemo(() => query(
        conversationsRef, 
        where("participants", "array-contains", currentUserId),
        orderBy('updatedAt', 'desc')        
    ), []);

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
        <ChatsContext.Provider 
            value={{
                user, conversationsRef, conversations, 
                conversationsAreLoading, fetchMoreConversations
            }} 
        >
            {children}
        </ChatsContext.Provider>
    )
} 

export const ChatsContextProvider = ({ children }: PropsWithChildren) => {
    const { user } = useAuthContext();
    if(!user) 
        return null // ... to be decided, If not authenticated we can render something like a login screen 

    return (
        <AuthenticatedProvider user={user}>
            {children}
        </AuthenticatedProvider>
    )
}

export default ChatsContext;