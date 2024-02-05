import { View } from 'react-native';
import { ThemedText } from '~/components/ThemedComponents';

export default function Profile() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Profile</ThemedText>
        </View>
    );
}