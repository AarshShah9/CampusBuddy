import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";

export default function BackButton() {
    const { navigateTo } = useNavigationContext();

    const goBackToHome = useCallback(() => {
        navigateTo({ page: 'Home' })
    }, [])

    return (
        <TouchableOpacity onPress={goBackToHome}>
            <View style={styles.container}>
                <MaterialIcons name="arrow-back-ios" size={24} color="white" />
                <Text style={styles.text}>Home</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginLeft: -6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: { 
        color: 'white',
        fontSize: 16
    }
})