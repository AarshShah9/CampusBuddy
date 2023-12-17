import { View, Text, StyleSheet } from 'react-native'
import { ThemedText } from './ThemedComponents';
import useThemeContext from '~/hooks/useThemeContext';

type MessageProps = {
    message: { type: string, content: string },
    isSender: boolean,
    consecutive: boolean
}
export default function Message ({ message, isSender, consecutive }: MessageProps) {
    const { theme } = useThemeContext();

    const marginObject = {
        ...(consecutive ? styles.consecutiveMargin : styles.normalMargin)
    };
    const flexDirectionStyle  = isSender ? styles.rowReverseDirection : styles.rowDirection;
    const radiusStyle  = isSender ? styles.noTopRightRadius : styles.noTopLeftRadiius;
    const bgColorStyle = isSender ? 
    { backgroundColor: theme.colors.surfaceVariant }
    :{ backgroundColor: theme.colors.inversePrimary };

    return (
        <View style={[styles.messageContainer, flexDirectionStyle, marginObject]}>
            <View style={[styles.messageContainerInner, !consecutive ? radiusStyle : {}, bgColorStyle]}>
                <ThemedText style={styles.textMessage}>{message.content}</ThemedText>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    messageContainer: {
        paddingLeft: 15
    },
    rowReverseDirection: {
        flexDirection: 'row-reverse',
    },
    rowDirection: {
        flexDirection: 'row',
    },
    consecutiveMargin: {
        marginBottom: 6
    },
    normalMargin: {
        marginBottom: 20
    },
    messageContainerInner: {
        borderRadius: 12,
        maxWidth: '50%',
        minHeight: 50,
    },
    noTopRightRadius: {
        borderTopRightRadius: 0,
    },
    noTopLeftRadiius: {
        borderTopLeftRadius: 0,
    },
    textMessage: {
        padding: 10,
        fontSize: 17.6, 
    }
});