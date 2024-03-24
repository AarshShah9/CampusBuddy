import useThemeContext from "~/hooks/useThemeContext";
import { useCallback, useState } from "react";
import useAppContext from "~/hooks/useAppContext";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { ThemedTextInput } from "~/components/ThemedComponents";

export function SearchArea({
  setSearchQuery,
}: {
  setSearchQuery: (text: string) => void;
}) {
  const { theme } = useThemeContext();

  const [filterWord, setFilterWord] = useState("");

  const updateFilterWord = useCallback((text: string) => {
    setFilterWord(text);
    setSearchQuery(text);
  }, []);

  const clearSearchArea = useCallback(() => {
    setFilterWord("");
    setSearchQuery("");
  }, []);

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
          <AntDesign name="closecircle" size={15} color={theme.colors.text} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  },
});
