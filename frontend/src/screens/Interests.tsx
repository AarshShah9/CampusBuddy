import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Text } from "react-native-paper"
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useThemeContext from "~/hooks/useThemeContext"
import { useState } from "react";

const interests = ["Technology", "Art", "Dance", "Music", "Debate", "E-Sports", "Politics", "Housing", "Coding"];

const InterestComponent = ({ interest }: { interest: string }) => {
    const { theme, inDarkMode } = useThemeContext();

    const [interested, setInterested] = useState(false);

    const handleClick = () => setInterested(previousState => !previousState)

    const color = inDarkMode ? "white" : "#2f2924";

    return (
        <TouchableOpacity onPress={handleClick}>
            <View 
                style={[
                    styles.addInterestButton,
                    styles.interestContainer,
                    {
                        borderColor: color,
                        backgroundColor: interested ? theme.colors.inversePrimary : undefined
                    }
                ]}
            >
                <Ionicons name="add" size={24} color={color} />
                <Text 
                    style={[
                        styles.addInterestButtonText,
                        { color }
                    ]}
                >
                    {interest}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const AddInterestButton = () => {
    const { theme } = useThemeContext();

    const handleAddInterest = () => {}

    return (
        <TouchableOpacity onPress={handleAddInterest}>
                <View style={[styles.addInterestButton, { backgroundColor: theme.colors.primary }]}>
                    <Ionicons name="add" size={24} color="white" />
                    <Text style={styles.addInterestButtonText}>Add a new Interest</Text>
                </View>
        </TouchableOpacity>
    )
}

const ShowMoreButton = () => {
    return (
        <TouchableOpacity>
            <View style={styles.showMoreButton}>
                <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
                <Text style={styles.showMoreButtonText}>Show more interests</Text>
            </View>
        </TouchableOpacity>
    )
}

export default function Interests() {
    return (
        <View style={styles.container}>
            <Text style={styles.topText}>Suggested interests based on your profile</Text>
            <AddInterestButton />
            <View style={styles.interestsContainer}>
                {interests.map(interest => <InterestComponent key={interest} interest={interest} />)}
            </View>
            <ShowMoreButton />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 40,
    },
    topText: {
        fontFamily: "Nunito-Medium",
        fontSize: 16
    },
    addInterestButton: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        height: 48,
        borderRadius: 8,
        gap: 5,
        marginVertical: 15
    },
    addInterestButtonText: {
        color: "white",
        fontFamily: "Nunito-Bold",
        fontSize: 18
    },
    interestsContainer: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    interestContainer: {
        marginRight: 15,
        borderWidth: 1
    },
    showMoreButton: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#dcdad7",
        borderRadius: 8,
        gap: 5,
        marginVertical: 25
    },
    showMoreButtonText: {
        color: "black",
        fontSize: 16,
        fontFamily: "Nunito-Bold"
    }
})