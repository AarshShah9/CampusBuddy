import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "~/hooks/useThemeContext";
import { useCallback, useEffect, useState } from "react";
import useAppContext from "~/hooks/useAppContext";
import { ThemedText, ThemedTextInput } from "~/components/ThemedComponents";
import { useQuery } from "@tanstack/react-query";
import { Search } from "~/lib/apiFunctions/Events";
import AttendeeCard from "~/components/AttendeeCard";

type SearchQueryResultType = {
  id: string;
  name: string;
  image: string;
  type: "User" | "Organization";
};

// TODO Make this modal style more consistent with the app's theme
const SearchArea = () => {
  const { theme } = useThemeContext();
  const [filterWord, setFilterWord] = useState("");
  const [debouncedFilterWord, setDebouncedFilterWord] = useState(filterWord);
  const [isModalVisible, setIsModalVisible] = useState(false); // New state for modal visibility
  const insets = useSafeAreaInsets();

  // Function to handle input change and trigger debouncing
  const updateFilterWord = useCallback((text: string) => {
    setFilterWord(text);
  }, []);

  // Clear search input
  const clearSearchArea = useCallback(() => {
    setFilterWord("");
    // Immediately clear the search without waiting for debounce
    setDebouncedFilterWord("");
  }, []);

  const { dismissKeyboard } = useAppContext();

  // Debounce filterWord update
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterWord(filterWord);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [filterWord]);

  // Use debouncedFilterWord for the query
  const { data: searchResult } = useQuery<SearchQueryResultType[]>({
    queryKey: ["searchResult", debouncedFilterWord],
    queryFn: () => Search({ query: debouncedFilterWord }),
    enabled: debouncedFilterWord !== "",
  });

  const handleClick = useCallback(() => {
    // TODO MAKE THIS MORE SEEMLESS (WE should be able to navigate to the user profile, without closing the modal)
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={[
          styles.searchBar,
          { backgroundColor: theme.colors.background, width: "100%" },
        ]}
      >
        <AntDesign
          name="search1"
          size={20}
          color={"grey"}
          style={{ paddingRight: 5 }}
        />
        <ThemedTextInput
          placeholder="Search"
          placeholderTextColor={"grey"}
          style={[styles.searchBarInput, { color: theme.colors.text }]}
          editable={false}
        />
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={false}
        visible={isModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!isModalVisible);
        }}
        style={{
          backgroundColor: theme.colors.background,
        }}
      >
        <View
          style={[
            styles.fullScreenModalView,
            {
              backgroundColor: theme.colors.background,
              paddingTop: insets.top + 15,
              paddingBottom: 15,
            },
          ]}
        >
          <View
            style={[
              styles.searchBarModal,
              {
                backgroundColor: theme.colors.background,
                borderStyle: "solid",
                borderBottomWidth: 1,
                borderBottomColor: "grey",
                paddingBottom: 15,
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{ paddingRight: 10 }}
            >
              <AntDesign name="arrowleft" size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <ThemedTextInput
              autoFocus={true}
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
          {searchResult &&
            searchResult.length > 0 &&
            searchResult.map((result) => (
              <AttendeeCard
                item={{
                  id: result.id,
                  name: result.name,
                  image: result.image,
                }}
                type={result.type}
                onPress={handleClick}
              />
            ))}
        </View>
      </Modal>
    </>
  );
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
            paddingBottom: 15,
          },
        ]}
      >
        <View style={styles.searchArea}>
          <SearchArea />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
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
  fullScreenModalView: {
    flex: 1,
    paddingTop: 45, // Adjust this value as needed to match your header's height
    paddingHorizontal: 10,
  },
  searchBarModal: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    minHeight: 34,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "#FFF", // Set the background color to match your theme or search bar
  },
});
