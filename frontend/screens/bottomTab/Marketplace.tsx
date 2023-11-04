import { View } from 'react-native';
import { ThemedText } from '../../components/ThemeProvider';

export default function Marketplace() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Marketplace</ThemedText>
        </View>
    );
}