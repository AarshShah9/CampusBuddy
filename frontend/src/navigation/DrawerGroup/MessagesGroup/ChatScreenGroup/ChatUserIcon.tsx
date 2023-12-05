import { View, Image } from 'react-native'

export default function ChatUserIcon({ uri }: { uri: string }) {
    return (
        <View style={{ width: 40, height: 40, borderRadius: 50, overflow: 'hidden' }}>
            <Image style={{ width: '100%', height: '100%' }} source={{ uri }} />
        </View>
    )
}