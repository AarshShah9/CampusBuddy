import { Timestamp } from "firebase/firestore";

export type ChatScreenParams = {
  userId: string;
  userName: string;
  icon: string;
};

export type MessageObject = {
  id: string;
  senderId: string;
  receiverId: string;
  message: {
    type: string;
    content: string;
  };
  createdAt: Timestamp;
  timeRead: Timestamp | null;
};
export type FirestoreMessageObject = {
  senderId: string;
  receiverId: string;
  message: {
    type: string;
    content: string;
  };
  createdAt: Timestamp;
  timeRead: Timestamp | null;
};
export type ConversationObject = {
  id: string;
  participants: string[];
  lastMessage: string;
  unreadMessages: {
    firstParticipant: number;
    secondParticipant: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
export type FirestoreConversationObject = {
  participants: string[];
  lastMessage: string;
  unreadMessages: {
    firstParticipant: number;
    secondParticipant: number;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
