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
    }
}