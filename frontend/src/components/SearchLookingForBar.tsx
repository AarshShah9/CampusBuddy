import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import PersonChip from "./PersonChip";
import CommentsChip from "./CommentsChip";

type Props = {
    title: string,
    description: string,
    requiredMembers?: number
};

export default function LookingForItem({ title, description, requiredMembers }: Props) {
    return (
        <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
            <View style={styles.bottomContainer}>  
                    <CommentsChip />
                {requiredMembers && <PersonChip numberOfUsers={requiredMembers} />}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        //height: 174,
        marginTop: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: "rgb(204, 204, 204)",
    },
    title: {
        fontFamily: 'Nunito-Bold',
        fontSize: 18,
        marginBottom: 8
    },
    description: {
        fontFamily: 'Roboto-Reg',
    },
    bottomContainer: {
        marginTop: 20,
        marginBottom: 15,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})