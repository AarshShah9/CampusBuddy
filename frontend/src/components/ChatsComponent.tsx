import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Pressable } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import useThemeContext from '~/hooks/useThemeContext';
import { Ionicons } from '@expo/vector-icons';

type messageObject = { 
    id: string, 
    senderId: string, 
    receiverId: string, 
    message: { 
        type: string, 
        content: string 
    }
}
const Messages = [
    {
        id: '11',
        senderId: '1',
        receiverId: '2',
        message: { type: 'text', content: 'Hello there' }
    },
    {
        id: '22',
        senderId: '2',
        receiverId: '1',
        message: { type: 'text', content: `Hey what's up` }
    },
    {
        id: '33',
        senderId: '1',
        receiverId: '2',
        message: { type: 'text', content: `Nothing, much was just saying hi` }
    },
    {
        id: '44',
        senderId: '2',
        receiverId: '1',
        message: { type: 'text', content: `Oh okay` }
    },
    {
        id: '55',
        senderId: '2',
        receiverId: '1',
        message: { type: 'text', content: `How are you doing?` }
    },
];

type MessageProps = {
    message: { type: string, content: string },
    isSender: boolean
}
const Message = ({ message, isSender }: MessageProps) => {
    return (
        <View style={styles.messageContainer}>
            <Text>Hello There</Text>
        </View>
    )
}

export default function ChatsComponent() {
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
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 87 : 0}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1 }}>
                    <ScrollView style={styles.messagesArea}>
                        <Pressable>
                            {Messages.map(message => (
                                <Message 
                                    key={message.id} 
                                    message={message.message} 
                                    isSender={message.senderId === '1'} 
                                />
                            ))}
                        </Pressable>
                    </ScrollView>
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
    },
    messageContainer: {
        backgroundColor: 'red',
        maxWidth: '50%',
        minHeight: 50
    }
});