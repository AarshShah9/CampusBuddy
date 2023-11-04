import { Text, View } from 'react-native';
import useAppContext from '../../../hooks/useAppContext';

export default function GeneralSettings() {
    const { inDarkMode } = useAppContext();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: inDarkMode ? 'white' : 'black' }}>General Settings</Text>
        </View>
    );
}