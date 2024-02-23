import { Text } from "react-native-paper";
import { EvilIcons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import useThemeContext from "~/hooks/useThemeContext";

type LocationChipProps = {
    location: string;
};

export default function LocationChip({ location }: Readonly<LocationChipProps>) {
    const { theme } = useThemeContext();

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.inversePrimary }]}>
            <View style={styles.innerContainer}>
                <EvilIcons name="location" size={20} color="black" />
                <Text>{location}</Text>
            </View>
        </View>
    );
}

// prettier-ignore
const styles = StyleSheet.create({
    container: {
        borderRadius: 29,
        paddingVertical: 2.5,
        paddingLeft: 1,
        paddingRight: 6,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})