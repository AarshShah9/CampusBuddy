import { Timestamp } from "firebase/firestore"

export type ChatScreenParams = { 
    userId: string, 
    userName: string, 
    icon: string 
}

export type MessageObject = { 
    id: string, 
    senderId: string, 
    receiverId: string, 
    message: { 
        type: string, 
        content: string 
    },
    createdAt: Timestamp,
    timeRead?: Timestamp
}
export type FirestoreMessageObject = {  
    senderId: string, 
    receiverId: string, 
    message: { 
        type: string, 
        content: string 
    },
    createdAt: Timestamp
    timeRead?: Timestamp
}
export type ConversationObject = { 
    id: string, 
    participants: string[] 
    numUnreadMessages: number, 
    lastMessage: string,
    createdAt: Timestamp,
    updatedAt: Timestamp
}
export type FirestoreConversationObject = {  
    participants: string[] 
    numUnreadMessages: number, 
    lastMessage: string,
    createdAt: Timestamp,
    updatedAt: Timestamp
}
export type ChatListItem = {
    userId: string,
    lastMessage: string,
    numUnreadMessages: number
}