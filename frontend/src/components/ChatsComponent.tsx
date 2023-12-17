import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { 
    View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback,
    Keyboard, TouchableOpacity, FlatList } from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from 'react-native-gesture-handler';
import useThemeContext from '~/hooks/useThemeContext';
import { Ionicons } from '@expo/vector-icons';
import Message from './Message';
import useMessagesContext from '~/hooks/useMessagesContext';
import useAuthContext from '~/hooks/useAuthContext';
import { MessageObject } from '~/types/Chat';
import ListLoader from './ListLoader';
import { getSortedKey, initialNumberOfMessages } from '~/lib/helperFunctions';
import useMessagesNavigationContext from '~/hooks/useMessagesNavigationContext';

const Messages = [
    {
        id: '11',
        senderId: '1',
        receiverId: '2',
        message: { type: 'text', content: 'Hello there' }
    },
    {
        id: '12',
        senderId: '2',
        receiverId: '1',
        message: { type: 'text', content: `Hey what's up` }
    },
    {
        id: '13',
        senderId: '1',
        receiverId: '2',
        message: { type: 'text', content: `Nothing, much was just saying hi` }
    },
    {
        id: '14',
        senderId: '2',
        receiverId: '1',
        message: { type: 'text', content: `Oh okay` }
    },
    {
        id: '15',
        senderId: '2',
        receiverId: '1',
        message: { type: 'text', content: `How are you doing though?` }
    },
    {
        id: '16',
        senderId: '1',
        receiverId: '2',
        message: { type: 'text', content: `Pretty cool, just working on a simple project` }
    },
    {
        id: '17',
        senderId: '1',
        receiverId: '2',
        message: { type: 'text', content: `It's been taking me quite long tho` }
    },
    {
        id: '18',
        senderId: '1',
        receiverId: '2',
        message: { type: 'text', content: `Been grinding for a while` }
    },
    {
        id: '19',
        senderId: '2',
        receiverId: '1',
        message: { type: 'text', content: `Oh damn, sorry bro` }
    },
    {
        id: '20',
        senderId: '2',
        receiverId: '1',
        message: { type: 'text', content: `So you not goin to the party this weekend?` }
    },
    {
        id: '21',
        senderId: '1',
        receiverId: '2',
        message: { type: 'text', content: `Nah I don't think so` }
    },
    {
        id: '22',
        senderId: '2',
        receiverId: '1',
        message: { type: 'text', content: `You serious?` }
    },
];

const ListArea = ({ otherEndUserId }: { otherEndUserId: string }) => {
    const { openedConversations, user, fetchMoreMessages } = useMessagesContext();
    
    const { id : currentUserId } = user;

    const conversation = openedConversations[getSortedKey(currentUserId, otherEndUserId)];
    
    if(conversation.status === 'not-opened')
        return null

    const { messages } = conversation;

    const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);

    const [moreDataFetchingAllowed, setMoreDataFetchingAllowed] = useState(false);
    const allowMoreDataFetching = useCallback(() => {
        setMoreDataFetchingAllowed(true);
    }, [])

    const getMoreMessages = () => {
        if(moreDataFetchingAllowed && (messages.length >= initialNumberOfMessages)) {
            setIsLoadingMoreData(true);
            fetchMoreMessages(otherEndUserId).then(() => {
                setIsLoadingMoreData(false);
            })
        }       
    }

    return (
        <View style={styles.messagesArea}>
            <View style={{ flex: 1 }}>
                <FlashList initialScrollIndex={0} onScroll={allowMoreDataFetching}
                    ListHeaderComponent={() => <View style={{ height: 10 }}></View>}
                    ListFooterComponent={() => <ListLoader isLoading={isLoadingMoreData} /> }
                    inverted estimatedItemSize={40} 
                    data={messages}   
                    renderItem={({ index, item: message }) => {
                        let previousIsOwner = index === 0 ? false : messages[index - 1].senderId === currentUserId;
                        let currentIsOwner = message.senderId === currentUserId;  
                    
                        return (
                            <Message 
                                isLastMessage={index === Messages.length - 1}
                                message={message.message} 
                                isSender={currentIsOwner} 
                                consecutive={index === 0 ? false : previousIsOwner === currentIsOwner} 
                            />
                        )
                    }} 
                    onEndReached={getMoreMessages}
                    onEndReachedThreshold={0}
                />  
            </View>
        </View> 
    )
}


const TypingArea = () => {
    const { theme, inDarkMode } = useThemeContext();
    const themedTextInputStyle = inDarkMode ? { 
        backgroundColor: 'grey',
        color: 'white'
    } : { 
        backgroundColor: 'white',
        color: 'black'
    }

    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
      // Implement your logic to send the message
      console.log('Sending message:', message);
  
      // Clear the input field after sending the message
      //setMessage('');
    };

    return (
        <View style={[styles.typingArea, { backgroundColor: theme.colors.surfaceVariant }]}>
            <View style={styles.typingAreaInner}>
                <TextInput multiline
                    style={[styles.textInput, themedTextInputStyle]}
                    placeholder="Type a message..."
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                />
                <TouchableOpacity onPress={handleSendMessage}>
                    <Ionicons name="send" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    )
}


export default function ChatsComponent({ otherEndUserId }: { otherEndUserId: string }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 87 : 0}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <ListArea otherEndUserId={otherEndUserId} />             
                    <TypingArea />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    messagesArea: {
        flex: 1,
    },
    typingArea: { 
        paddingTop: 6,
    },
    typingAreaInner: { 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    textInput: { 
        fontSize: 17.6,
        paddingHorizontal: 10,
        marginRight: 15,
        width: '80%', 
        minHeight: 30,
        borderColor: 'gray', 
        borderWidth: 1, 
        borderRadius: 14,
    }
});