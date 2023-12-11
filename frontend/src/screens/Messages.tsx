import { View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Pressable } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import useThemeContext from "~/hooks/useThemeContext";
import { FlashList } from "@shopify/flash-list";
import ConversationItem from "~/components/ConversationItem";
import useMessagesContext from "~/hooks/useMessagesContext";
import ListLoader from "~/components/ListLoader";
import useAuthContext from "~/hooks/useAuthContext";
import { useState } from "react";

const ChatList = [
    {
        userId: '1',
        userName: 'Jarvis',
        lastMessage: 'Hello There, I am Jarvis',
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/jarvis.webp`
    },
    {
        userId: '2',
        userName: 'Tony Stark',
        lastMessage: `I guess what I'm trying to say is that: "I am Iron Man"`,
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/tonystark.jpg`
    },
    {
        userId: '3',
        userName: 'Doctor Strange',
        lastMessage: 'The Fate of the multiverse is in my hands',
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/doctorstrange.webp`
    },
    {
        userId: '4',
        userName: 'Hulk',
        lastMessage: 'Hulk Smaaaashhhhhhhh!',
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/hulk.webp`
    },
    {
        userId: '5',
        userName: 'Reed Richards',
        lastMessage: 'I am supposed to be the smartest man alive',
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/reedrichards.webp`
    },
    {
        userId: '6',
        userName: 'Black Widow',
        lastMessage: `She's russian, she can fight, she's also hot`,
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/blackwidow.jpg`
    },
    {
        userId: '7',
        userName: 'Doctor Fate',
        lastMessage: 'Vengeance of horus',
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/doctorfate.jpg`
    },
    {
        userId: '8',
        userName: 'Moon Knight',
        lastMessage: 'Where am I, how did I get here?',
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/moonknight.webp`
    },
    {
        userId: '9',
        userName: 'Spider man',
        lastMessage: 'Hello There, I am Jarvis',
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/spiderman.jpg`
    },
    {
        userId: '10',
        userName: 'Morbius',
        lastMessage: `It's Morbine time!`,
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/morbius.avif`
    },
    {
        userId: '11',
        userName: 'Thanos',
        lastMessage: `What I'm gonna to your little world, I'm gonna enjoy it`,
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/thanos.jpg`
    },
    {
        userId: '12',
        userName: 'Captain America',
        lastMessage: 'I can do this all day',
        newMessages: 0,
        icon: `https://dszszc0yvwld8.cloudfront.net/Randoms/capamerica.jpg`
    },
];

const CoversationsArea = () => {
    const { conversations, user } = useMessagesContext();
    const { id : currentUserId } = user;

    const [isLoadingMoreData, setIsLoadingMoreData] = useState(false);

    return (
        <View style={styles.chatListArea}>
            <View style={{ flex: 1 }}>
                <FlashList
                    ListHeaderComponent={() => <View style={{ height: 10 }}></View>}
                    ListFooterComponent={() => <ListLoader isLoading={isLoadingMoreData} /> }
                    estimatedItemSize={200}
                    data={conversations}   
                    renderItem={({ item }) => 
                        <ConversationItem
                            userId={item.participants.filter(id => id !== currentUserId)[0]}
                            lastMessage={item.lastMessage}
                            numUnreadMessages={item.numUnreadMessages}
                        />
                    } 
                />
            </View>
        </View>
    )
}

export default function Messages() {    
    const { theme } = useThemeContext();

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ flex: 1 }}>
                <View style={[styles.searchArea, { borderBottomColor: theme.colors.backdrop }]}>
                    <View style={[styles.searchBar, { backgroundColor: `${theme.colors.surfaceVariant}`}]}>
                        <AntDesign name="search1" size={20} color="grey" />
                        <TextInput 
                            placeholder='Search Chats'
                            placeholderTextColor='grey'
                            style={styles.searchBarInput}
                        />
                    </View>
                </View>
                <CoversationsArea />
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
        borderBottomWidth: 1
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
        flex: 1
    }
});
