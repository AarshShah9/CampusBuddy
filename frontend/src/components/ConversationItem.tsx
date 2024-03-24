import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableHighlight,
} from "react-native";
import { ThemedText } from "~/components/ThemedComponents";
import useChatContext from "~/hooks/useChatContext";
import useNavigationContext from "~/hooks/useNavigationContext";
import useSearchBarContext from "~/hooks/useSearchBarContext";
import useThemeContext from "~/hooks/useThemeContext";
import { getUserDataApi } from "~/lib/apiFunctions/User";
import {
    passesFilterCondition,
    getProperTimeUpdated,
    limitTextToMax,
} from "~/lib/helperFunctions";

type Props = {
    userId: string;
    lastMessage: string;
    unreadMessages: {
        firstParticipant: number;
        secondParticipant: number;
    };
    timeUpdated: Timestamp;
};

export default function ConversationItem({
    userId,
    lastMessage,
    unreadMessages,
    timeUpdated,
}: Props) {
    const { openConversation, getNumberOfUnreadMessages } = useChatContext();
    const { navigateTo } = useNavigationContext();
    const { theme } = useThemeContext();

    const [fetchedData, setFetchedData] = useState({
        userName: "",
        icon: "#",
    });

    const { userName, icon } = fetchedData;

    useEffect(() => {
        getUserDataApi(userId)
            .then(
                (item) =>
                    item && setFetchedData({ userName: item.name, icon: item.icon }),
            )
            .catch((err) => console.log("error occured", err));
    }, [userId]);

    const onPressHandler = () => {
        navigateTo({ page: "ChatScreen", userId, userName, icon });
        openConversation(userId);
    };

    const numUnreadMessages = getNumberOfUnreadMessages(userId, unreadMessages);

    const { filterWord } = useSearchBarContext();

    if (!passesFilterCondition(userName, filterWord)) return null;

    return (
        <TouchableHighlight
            onPress={onPressHandler}
            underlayColor={theme.colors.surfaceVariant}
        >
            <View style={styles.chatListItemContainer}>
                <View style={styles.chatListItemPictureArea}>
                    <Image style={styles.userIcon} source={{ uri: icon }} />
                </View>
                <View
                    style={[
                        styles.chatListItemMessageArea,
                        { borderBottomColor: theme.colors.backdrop },
                    ]}
                >
                    <View style={styles.topSection}>
                        <View style={{ width: "69%" }}>
                            <ThemedText style={styles.userName}>
                                {limitTextToMax(userName, 19)}
                            </ThemedText>
                        </View>
                        <View style={{ width: "29%", alignItems: "flex-end" }}>
                            <ThemedText
                                style={{ color: numUnreadMessages > 0 ? "#3a95e9" : "grey" }}
                            >
                                {timeUpdated ? getProperTimeUpdated(timeUpdated.toDate()) : ""}
                            </ThemedText>
                        </View>
                    </View>
                    <View style={styles.bottomSection}>
                        <View style={{ width: "86.5%" }}>
                            <Text style={styles.lastMessage}>
                                {limitTextToMax(lastMessage, 79)}
                            </Text>
                        </View>
                        {numUnreadMessages > 0 && (
                            <View style={styles.unreadMessagesContainer}>
                                <ThemedText>{numUnreadMessages}</ThemedText>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    chatListItemContainer: {
        width: "100%",
        paddingLeft: 20,
        height: 80,
        flexDirection: "row",
    },
    chatListItemPictureArea: {
        flex: 0.17,
        justifyContent: "center",
    },
    userIcon: {
        width: 57,
        height: 57,
        borderRadius: 50,
    },
    chatListItemMessageArea: {
        paddingTop: 10,
        paddingRight: 20,
        flex: 0.83,
        borderBottomWidth: 0.8
    },
    topSection: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bottomSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    unreadMessagesContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 20,
        height: 20,
        borderRadius: 50,
        backgroundColor: "#3a95e9",
    },
    userName: {
        fontSize: 19,
        fontWeight: "bold",
    },
    lastMessage: {
        fontSize: 15,
        color: "grey",
    },
});