import { useRef, useState, useEffect } from 'react';
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

type Props = {
    currentUserId: string,
    message: MessageObject,
    index: number
}
const MessageRenderItem = ({ currentUserId, index, message } : Props) => {
    let previousIsOwner = index === 0 ? false : Messages[index - 1].senderId === currentUserId;
    let currentIsOwner = message.senderId === currentUserId;  

    return (
        <Message 
            isLastMessage={index === Messages.length - 1}
            message={message.message} 
            isSender={currentIsOwner} 
            consecutive={index === 0 ? false : previousIsOwner === currentIsOwner} 
        />
    )
}

export default function ChatsComponent() {
    const { user } = useAuthContext();
    if(!user) 
        return null
    
    const { id : currentUserId } = user;

    const { messages } = useMessagesContext();
    const [texts, setTexts] = useState(messages);

    let scrollViewRef = useRef<ScrollView | null>(null);
    //let scrollViewRef = useRef<ScrollView | null>(null);

    useEffect(() => {
        // not doing anything for some reason, only works on refresh
        /* if(scrollViewRef.current){
            scrollViewRef.current.scrollTo({
                x: 0,
                y: 100,
                animated: true
              });
        } */
    }, [])

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
    
    const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 87 : 0}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <View style={styles.messagesArea}>
                        <FlashList
                            ListHeaderComponent={() => <View style={{ height: 10 }}></View>}
                            ListFooterComponent={() => <ListLoader isLoading={isLoadingMoreData} /> }
                            estimatedItemSize={200} inverted
                            data={texts}   
                            renderItem={({ index, item }) => 
                                <MessageRenderItem 
                                    {...{ currentUserId, index, message: item }} 
                                />
                            } 
                        />  
                    </View>                  
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