import { View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import useThemeContext from "~/hooks/useThemeContext";
import { ScrollView } from 'react-native-gesture-handler';
import ChatListItem from "~/components/ChatListItem";

const chatList = [
    {
        userId: '1',
        userName: 'Jarvis',
        lastMessage: 'Hello There, I am Jarvis',
        newMessages: 0
    },
    {
        userId: '2',
        userName: 'Tony Stark',
        lastMessage: `I guess what I'm trying to say is that: "I am Iron Man"`,
        newMessages: 0 
    },
    {
        userId: '3',
        userName: 'Doctor Strange',
        lastMessage: 'The Fate of the multiverse is in my hands',
        newMessages: 0 
    },
    {
        userId: '4',
        userName: 'Hulk',
        lastMessage: 'Hulk Smaaaashhhhhhhh!',
        newMessages: 0 
    },
    {
        userId: '5',
        userName: 'Reed Richards',
        lastMessage: 'I am supposed to be the smartest man alive',
        newMessages: 0
    },
    {
        userId: '6',
        userName: 'Tony Stark',
        lastMessage: `I guess what I'm trying to say is that: "I am Iron Man"`,
        newMessages: 0 
    },
    {
        userId: '7',
        userName: 'Doctor Strange',
        lastMessage: 'The Fate of the multiverse is in my hands',
        newMessages: 0 
    },
    {
        userId: '8',
        userName: 'Hulk',
        lastMessage: 'Hulk Smaaaashhhhhhhh!',
        newMessages: 0 
    },
    {
        userId: '9',
        userName: 'Jarvis',
        lastMessage: 'Hello There, I am Jarvis',
        newMessages: 0
    },
    {
        userId: '10',
        userName: 'Tony Stark',
        lastMessage: `I guess what I'm trying to say is that: "I am Iron Man"`,
        newMessages: 0 
    },
    {
        userId: '11',
        userName: 'Doctor Strange',
        lastMessage: 'The Fate of the multiverse is in my hands',
        newMessages: 0 
    },
    {
        userId: '12',
        userName: 'Hulk',
        lastMessage: 'Hulk Smaaaashhhhhhhh!',
        newMessages: 0 
    },
];

export default function Messages() {
    const { theme } = useThemeContext();

    const chatListItemClickHandler = (chatIndex: number) => {
        console.log('clicked chat: ', chatIndex)
    }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ flex: 1 }}>
            <View style={styles.searchArea}>
                <View style={[styles.searchBar, { backgroundColor: `${theme.colors.surfaceVariant}`}]}>
                    <AntDesign name="search1" size={20} color="grey" />
                    <TextInput 
                        placeholder='Search Chats'
                        placeholderTextColor='grey'
                        style={styles.searchBarInput}
                    >   
                    </TextInput>
                </View>
            </View>
            <View style={styles.chatListArea}>
                <ScrollView>
                    <Pressable style={{ alignItems: 'center' }}>
                        {chatList.map((chat, index) => (
                            <ChatListItem key={chat.userId} userId={chat.userId}
                                clickHandler={() => chatListItemClickHandler(index)} 
                                userName={chat.userName} lastMessage={chat.lastMessage}
                            />
                        ))}
                    </Pressable>
                </ScrollView>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}


const styles = StyleSheet.create({
    searchArea: { 
        paddingHorizontal: 20,
        flex: 0.01,
        minHeight: 80,  
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgb(44,50,58)',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center', 
        width: '100%',
        minWidth: 300,
        minHeight: 34,
        borderRadius: 10,
        color: 'black',
        paddingHorizontal: 6 
    },
    searchBarInput: {
        height: '90%',
        marginLeft: 5,
        fontSize: 18,
        flex: 0.98,
        color: 'white'
    },
    chatListArea: { 
        flex: 0.99, 
    }
});
