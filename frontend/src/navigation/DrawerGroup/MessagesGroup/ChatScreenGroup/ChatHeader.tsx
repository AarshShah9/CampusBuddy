import { View, StyleSheet } from 'react-native'
import BackButton from '~/components/BackButton'
import ChatUserIcon from './ChatUserIcon'
import { ThemedText } from '~/components/ThemedComponents';

export default function ChatHeader({ navigation, route }: any) {

    return (
        <View style={{ flexDirection: 'row' }}>
            <BackButton 
                onPress={() => {
                    navigation.goBack()
                }} 
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ChatUserIcon uri={'https://picsum.photos/seed/picsum/200/300'} />
                <ThemedText style={styles.userName}>{(route.params as any)?.userName}</ThemedText>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userName: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold'
    }
});