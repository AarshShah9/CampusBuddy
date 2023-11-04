import { View } from 'react-native';
import { ThemedText } from '../../../components/ThemeProvider';

export default function GeneralSettings() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>General Settings</ThemedText>
        </View>
    );
}