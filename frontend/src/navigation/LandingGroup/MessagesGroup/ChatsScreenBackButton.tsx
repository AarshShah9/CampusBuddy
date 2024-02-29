import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

export default function BackButton() {
    const navigation = useNavigation<any>();

    const goBackToHome = useCallback(() => {
        navigation.navigate('Home')
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