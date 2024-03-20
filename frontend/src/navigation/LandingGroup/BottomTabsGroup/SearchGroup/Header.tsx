import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useThemeContext from "~/hooks/useThemeContext";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useAppContext from "~/hooks/useAppContext";
import { ThemedText, ThemedTextInput } from "~/components/ThemedComponents";
import { Animated } from "react-native";

const SearchArea = ({
  setIsFocused,
  animateWidth,
}: {
  setIsFocused: Dispatch<SetStateAction<boolean>>;
  animateWidth: Animated.AnimatedInterpolation<number>;
}) => {
  const { theme } = useThemeContext();

  const [filterWord, setFilterWord] = useState("");
  const updateFilterWord = useCallback((text: string) => {
    setFilterWord(text);
  }, []);
  const clearSearchArea = useCallback(() => {
    setFilterWord("");
  }, []);

  const { dismissKeyboard } = useAppContext();

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return (
    <Animated.View
      style={[
        styles.searchBar,
        { width: animateWidth, backgroundColor: `${theme.colors.background}` },
      ]}
    >
      {/*<TouchableOpacity onPress={dismissKeyboard}>*/}
      <TouchableOpacity>
        <AntDesign name="search1" size={20} color={theme.colors.text} />
      </TouchableOpacity>
      <ThemedTextInput
        placeholder="Search"
        placeholderTextColor={theme.colors.text}
        style={[styles.searchBarInput, { color: theme.colors.text }]}
        value={filterWord}
        onChangeText={updateFilterWord}
        onFocus={onFocus}
        onBlur={onBlur}
      />
      {filterWord !== "" && (
        <TouchableOpacity onPress={clearSearchArea}>
          <AntDesign name="closecircle" size={15} color={theme.colors.text} />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

export default function Header() {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeContext();
  const { dismissKeyboard } = useAppContext();
  const [isFocused, setIsFocused] = useState(false);
  const animateWidth = useRef(new Animated.Value(100)).current;

  const triggerAnimation = (focus: boolean) => {
    const duration = focus ? 150 : 300; // Faster when focused, slower when blurred
    Animated.timing(animateWidth, {
      toValue: focus ? 75 : 100,
      duration,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    triggerAnimation(isFocused);
  }, [isFocused]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setIsFocused(false);
      }}
    >
      <View
        style={[
          styles.headerContainer,
          {
            backgroundColor: theme.colors.primary,
            paddingTop: insets.top,
            paddingBottom: 10,
          },
        ]}
      >
        <View style={styles.searchArea}>
          <SearchArea
            setIsFocused={setIsFocused}
            animateWidth={animateWidth.interpolate({
              inputRange: [75, 100],
              outputRange: ["75%", "100%"],
            })}
          />
          {isFocused && (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                Keyboard.dismiss();
                setIsFocused(false);
              }}
            >
              <ThemedText style={{ color: theme.colors.text }}>
                Cancel
              </ThemedText>
            </TouchableOpacity>
          )}
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
  focusedSearchBar: {
    flex: 1,
  },
  cancelButton: {
    padding: 10,
  },
});
