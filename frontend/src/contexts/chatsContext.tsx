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
    where,
    limit,
    CollectionReference,
    DocumentData,
    onSnapshot,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { ConversationObject } from "~/types/Chat";
import useAuthContext from "~/hooks/useAuthContext";
import { UserDataType } from "~/types/User";
import { getSortedKey, initialNumberOfConversations } from "~/lib/helperFunctions";
import { conversationConverter, firestore } from "~/lib/firestoreConfig";

type contextObject = {
    user: UserDataType;
    conversationsRef: CollectionReference<DocumentData, DocumentData>;
    conversations: ConversationObject[];
    fetchMoreConversations: () => void;
    createNewEmptyConversation: (otherEndUserId: string) => Promise<void>;
    conversationsAreLoading: boolean;
};
const ChatsContext = createContext<contextObject | null>(null);

type Props = PropsWithChildren<{
    user: UserDataType;
}>;
function AuthenticatedProvider({ children, user }: Props) {
    const { id: currentUserId } = user;

    // memoizing the reference to the conversations collection
    const conversationsRef = useMemo(
        () =>
            collection(firestore, "conversations").withConverter(
                conversationConverter,
            ),
        [],
    );

    // memoizing the query main query used to obtain a user's conversations
    const conversationsQuery = useMemo(
        () =>
            query(
                conversationsRef,
                where("participants", "array-contains", currentUserId),
                orderBy("updatedAt", "desc"),
            ),
        [],
    );

    // A loading state for when more collection data is being retrieved
    const [conversationsAreLoading, setConversationsAreLoading] = useState(true);

    // A state to help determine if there is any more collection data to retrieve
    const [endReached, setEndReached] = useState(false);

    // A state to control the limit of documents to retrieve
    // The approach here is that if someone scrolls to the end, then the limit is increased so that more documents are retrieved
    const [documentsNeeded, setDocumentsNeeded] = useState(
        initialNumberOfConversations,
    );

    /**
     * Function to fetch more collection documents when user has scrolled to the end
     */
    const fetchMoreConversations = useCallback(() => {
        // Only retrieve more documents if there are any more to be retrieved
        // Doing this prevents an infinite cycle since without this firestore will circle back to beginning
        if (!endReached) {
            setConversationsAreLoading(true);
            setDocumentsNeeded((documentsNeeded) => {
                return documentsNeeded + initialNumberOfConversations;
            });
        }
    }, [endReached]);

    const [conversations, setConversations] = useState<ConversationObject[]>([]);

    const createNewEmptyConversation = useCallback(async (otherEndUserId: string) => {
        const exists = conversations.find(conv => {
            return (getSortedKey(conv.participants[0], conv.participants[1]) === getSortedKey(currentUserId, otherEndUserId))
        });
        if(exists)
            return
        // Only create conversation if it doesn't exist
        const timeStamp = serverTimestamp();
        await addDoc(conversationsRef, {
            id: "",
            lastMessage: "",
            participants: [currentUserId, otherEndUserId],
            unreadMessages: {
                firstParticipant: 0,
                secondParticipant: 0,
            },
            createdAt: timeStamp,
            updatedAt: timeStamp
        });
    }, [conversations, conversationsRef, currentUserId])

    // A useEffect to set up a new query listener when the number of docs needed changes
    useEffect(() => {
        let subscriber = onSnapshot(
            query(conversationsQuery, limit(documentsNeeded)),
            (snapshot) => {
                let results = snapshot.docs.map((doc) => doc.data());
                setConversations(results);
                setEndReached(results.length < documentsNeeded);
                setConversationsAreLoading(false);
            },
        );

        return () => {
            subscriber();
        };
    }, [documentsNeeded]);

    return (
        <ChatsContext.Provider
            value={{
                user,
                conversationsRef,
                conversations,
                conversationsAreLoading,
                fetchMoreConversations,
                createNewEmptyConversation
            }}
        >
            {children}
        </ChatsContext.Provider>
    );
}

export const ChatsContextProvider = ({ children }: PropsWithChildren) => {
    const { user } = useAuthContext();
    // Since this context is wrapped around the messaging screen stack
    // If a user is not authenticated then currently we are returning null
    // This is assuming that the user can still access certain parts of the app without being signed in
    if (!user) return null;

    return <AuthenticatedProvider user={user}>{children}</AuthenticatedProvider>;
};

export default ChatsContext;
