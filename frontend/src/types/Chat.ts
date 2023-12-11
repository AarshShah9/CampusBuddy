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
    createdAt: {
        seconds: number,
        nanoseconds: number
    },
    timeRead?: {
        seconds: number,
        nanoseconds: number
    }
}
export type FirestoreMessageObject = {  
    senderId: string, 
    receiverId: string, 
    message: { 
        type: string, 
        content: string 
    },
    createdAt: {
        seconds: number,
        nanoseconds: number
    },
    timeRead?: {
        seconds: number,
        nanoseconds: number
    }
}
export type ConversationObject = { 
    id: string, 
    participants: string[] 
    numUnreadMessages: number, 
    lastMessage: string,
    createdAt: {
        seconds: number,
        nanoseconds: number
    },
    updatedAt: {
        seconds: number,
        nanoseconds: number
    }
}
export type FirestoreConversationObject = {  
    participants: string[] 
    numUnreadMessages: number, 
    lastMessage: string,
    createdAt: {
        seconds: number,
        nanoseconds: number
    },
    updatedAt: {
        seconds: number,
        nanoseconds: number
    }
}
export type ChatListItem = {
    userId: string,
    lastMessage: string,
    numUnreadMessages: number
}