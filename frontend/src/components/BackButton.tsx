import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';

export default function BackButton({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity onPress={onPress} style={styles.wrapper}>
            <MaterialIcons style={styles.icon} name="arrow-back-ios" size={30} color="#3a95e9" />
            <Text style={styles.text}>Back</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    wrapper: { 
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        
    },
    text: {
        marginLeft: -9,
        marginRight: 20,
        fontSize: 20,
        color: '#3a95e9'
    }
});