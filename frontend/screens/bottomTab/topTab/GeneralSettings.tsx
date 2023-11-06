import { View } from 'react-native';
import { ThemedText } from '../../../components/ThemedComponents';

export default function GeneralSettings() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>General Settings</ThemedText>
        </View>
    );
}