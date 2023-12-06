import { View, Text, StyleSheet, Image, TouchableHighlight } from "react-native";
import { ThemedText } from '~/components/ThemedComponents';
import useMessagesNavigationContext from "~/hooks/useMessagesNavigationContext";
import useThemeContext from "~/hooks/useThemeContext";

const limitTextToMax = (arg: string, maxCharacters: number) => {
    return arg.length > maxCharacters ? `${arg.slice(0, maxCharacters)}...` : arg
}

type Props = {
    clickHandler: () => void,
    userId: string,
    userName: string,
    lastMessage: string,
    icon: string
}

export default function ChatListItem({ userId, userName, lastMessage, icon }: Props) {
    const { activateScreen } = useMessagesNavigationContext();
    const { theme } = useThemeContext();
    
    const onPressHandler = () => {
        activateScreen({ userId, userName, icon })
    }

    return (
        <TouchableHighlight onPress={onPressHandler}>
            <View style={styles.chatListItemContainer} >
                <View style={styles.chatListItemPictureArea}>
                    <Image style={styles.userIcon} source={{ uri: icon }} />
                </View>
                <View style={[styles.chatListItemMessageArea, { borderBottomColor: theme.colors.backdrop }]}>
                    <ThemedText style={styles.userName}>{userName}</ThemedText>
                    <Text style={styles.lastMessage}>{limitTextToMax(lastMessage, 99)}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}


const styles = StyleSheet.create({
    chatListItemContainer: {
        width: '100%',
        paddingLeft: 20,
        height: 80,
        flexDirection: 'row',
        
    },
    chatListItemPictureArea: {
        flex: 0.17,
        justifyContent: 'center',
    },
    userIcon: {
        width: 57,
        height: 57,
        borderRadius: 50,
    },
    chatListItemMessageArea: {
        paddingTop: 10,
        paddingRight: 20,
        flex: 0.83,
        borderBottomWidth: 1,
        /* borderBottomColor: 'rgb(44,50,58)', */
    },
    userName: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 15,
        color: 'grey'
    }
})