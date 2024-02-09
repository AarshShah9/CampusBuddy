import { View } from 'react-native';
import { ThemedText } from '~/components/ThemedComponents';

export default function AddFriends() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Add Friends</ThemedText>
        </View>
    );
}