import { Text } from "react-native-paper";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import useThemeContext from "~/hooks/useThemeContext";
import { Entypo } from '@expo/vector-icons';

export default function ReplyChip() {
    const { theme } = useThemeContext();

    return (
        <View style={[styles.container, {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderColor: theme.colors.onSurface
        }]}>
            <View style={styles.innerContainer}>
                <Entypo name="reply" size={15} color={theme.colors.onSurface} />
                <Text style={[styles.text, { 
                    color: theme.colors.onSurface
                }]}>
                    Reply
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 29,
        paddingVertical: 2.5,
        paddingHorizontal: 9,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        marginLeft: 4
    }
})