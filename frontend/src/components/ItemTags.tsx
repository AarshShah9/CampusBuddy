import { View, Text, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

export default function ItemTag(props: {
  controllerOnChange: any;
}) {
  const [tags, setTags] = useState(["HTML", "CSS", "JavaScript"]);
  const [currentInput, setCurrentInput] = useState("");
  const updateArray = useCallback(() => {
    props.controllerOnChange([...tags, currentInput]);
  }, [tags]);

  // Functions
  // function to handle adding tag
  const addTag = () => {
    // If input is empty than simply do nothing
    if (currentInput == "") return;
    const value = currentInput;
    if (!value.trim()) return;
    setTags([...tags, value]);
    setCurrentInput("");
    props.controllerOnChange([...tags, currentInput]);
  };

  // function to handling deleting tags
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
    <TagContainer>
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
            onPress={() => {
              deleteTag(index);
              updateArray;
            }}
            name="x-circle"
            size={18}
            color="black"
          />
        </View>
      ))}
      <TextInput
        style={{ flexGrow: 1 }}
        value={currentInput}
        onSubmitEditing={addTag}
        onChangeText={(text) => {
          setCurrentInput(text);
        }}
      />
    </TagContainer>
  );
}

// prettier-ignore
const TagContainer = styled(View)`
    marginBottom: 15px;
    width: 90%;
    minHeight:50px;
    borderColor:black;
    borderWidth:1px;
    flex-wrap: wrap;
    flex-direction:row;
    align-item:center;
    border-radius:3px;
    borderRadius:8px;
    padding:5px;
`
