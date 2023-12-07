import { View, StyleSheet } from 'react-native'
import BackButton from '~/components/BackButton'
import ChatUserIcon from './ChatUserIcon'
import { ThemedText } from '~/components/ThemedComponents';
import { ChatScreenParams } from '~/types/Chat';

export default function ChatHeader({ navigation, route }: any) {
    if(route.params) {
        const { userName, icon } = (route.params as ChatScreenParams);
        return (
            <View style={{ flexDirection: 'row' }}>
                <BackButton 
                    onPress={() => {
                        navigation.goBack()
                    }} 
                />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ChatUserIcon uri={icon} />
                    <ThemedText style={styles.userName}>{userName}</ThemedText>
                </View>
            </View>
        )
    }
    return null
}

const styles = StyleSheet.create({
    userName: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'
    }
});