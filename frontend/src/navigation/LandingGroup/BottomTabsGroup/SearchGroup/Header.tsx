import { View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "~/hooks/useThemeContext";
import { useCallback, useState } from "react";
import useAppContext from "~/hooks/useAppContext";
import { ThemedTextInput } from "~/components/ThemedComponents";

const SearchArea = () => {
    const { theme } = useThemeContext();
    
    const [filterWord, setFilterWord] = useState("");
    const updateFilterWord = useCallback((text: string) => {
        setFilterWord(text)
    }, [])
    const clearSearchArea = useCallback(() => {
        setFilterWord("")
    }, [])  

    const { dismissKeyboard } = useAppContext();

    return (
        <View
            style={[
                styles.searchBar,
                { backgroundColor: `${theme.colors.background}` },
            ]}
        >
            <TouchableOpacity onPress={dismissKeyboard}>
                <AntDesign name="search1" size={20} color={theme.colors.text} />
            </TouchableOpacity>
            <ThemedTextInput
                placeholder="Search"
                placeholderTextColor={theme.colors.text}
                style={[styles.searchBarInput, { color: theme.colors.text }]}
                value={filterWord}
                onChangeText={updateFilterWord}
            />
            {filterWord !== "" && (
                <TouchableOpacity onPress={clearSearchArea}>
                <AntDesign
                    name="closecircle"
                    size={15}
                    color={theme.colors.text}
                />
                </TouchableOpacity>
            )}
        </View>
    )
};

export default function Header() {
    const insets = useSafeAreaInsets();
    const { theme } = useThemeContext();
    const { dismissKeyboard } = useAppContext();

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <View 
                style={[
                    styles.headerContainer, 
                    { 
                        backgroundColor: theme.colors.primary, 
                        paddingTop: insets.top + 15,
                        paddingBottom: 15
                    }
                ]}
            >
                <View style={styles.searchArea}>
                    <SearchArea />
                    <AntDesign name="filter" size={30} color={theme.colors.onSecondary} />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        alignItems: "center",
        paddingHorizontal: 20,
        paddingBottom: 0,
    },
    searchArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%",
    },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        width: "87%",
        minWidth: 300,
        minHeight: 34,
        borderRadius: 10,
        paddingLeft: 6,
    },
    searchBarInput: {
        height: "90%",
        marginHorizontal: 5,
        fontSize: 18,
        flex: 0.98,
    }
});