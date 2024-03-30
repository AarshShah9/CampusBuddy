import { View, Text, TextInput, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import useThemeContext from "~/hooks/useThemeContext";
export default function ItemTag(props: {
  controllerOnChange: any;
  editable: boolean;
}) {
  const { theme } = useThemeContext();
  const [tags, setTags] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const updateArray = useCallback(
    (index: number) => {
      deleteTag(index);
      props.controllerOnChange([...tags, currentInput]);
    },
    [tags],
  );

  // Functions
  // Handle adding tag
  const addTag = () => {
    // If input is empty than simply do nothing
    if (currentInput == "") return;
    const value = currentInput;
    if (!value.trim()) return;
    setTags([...tags, value]);
    setCurrentInput("");
    // Change hook form value for tags
    props.controllerOnChange([...tags, currentInput]);
  };

  // Handle deleting tags
  const deleteTag = (tagIndex: number) => {
    setTags(
      tags.filter((value, index) => {
        return index != tagIndex;
      }),
    );
  };
  // Effect currently needed to update form value after delete key is pressed, not to sure how this affects performance
  useEffect(() => {
    props.controllerOnChange([...tags]);
  }, [tags]);

  return (
    <View style={styles.tagContainer}>
      {tags.map((tag, index) => (
        <View
          key={index}
          style={{
            backgroundColor: "grey",
            padding: 5,
            borderRadius: 8,
            height: 30,
            flexDirection: "row",
            alignSelf: "flex-start",
            margin: 2,
          }}
        >
          <Text style={{ marginRight: 5 }}>{tag}</Text>
          <Feather
            onPress={() => updateArray(index)}
            name="x-circle"
            size={18}
            color="black"
          />
        </View>
      ))}
      <TextInput
        style={{ flexGrow: 1, color: theme.colors.text }}
        value={currentInput}
        onSubmitEditing={addTag}
        onChangeText={(text) => {
          setCurrentInput(text);
        }}
        editable={props.editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tagContainer: {
    marginBottom: 15,
    width: "95%",
    minHeight: 50,
    borderColor: "grey",
    borderWidth: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    alignItem: "center",
    borderRadius: 8,
    padding: 5,
  },
});
