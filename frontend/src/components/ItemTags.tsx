import { View, Text, TextInput} from "react-native";
import { Feather } from '@expo/vector-icons';
import { useState,useEffect } from "react";
import styled from "styled-components";

export default function ItemTag(props: {controllerOnChange:any}) {

    const [tags, setTags] = useState(["HTML", "CSS", "JavaScript"]);
    const [currentInput, setCurrentInput] = useState("");

    // Functions
     // function to handle onChangeText
        const addTag = () => {
            const value = currentInput;
            console.log("value: " + value);
            if (!value.trim()) return;
            setTags([...tags, value]);
            setCurrentInput("");
        };

        // function to handling deleting tags
        const deleteTag = (tagIndex:number) => {
            setTags(tags.filter((value,index) => {
                return index != tagIndex }))
        }

    return(
        <TagContainer>
            {tags.map((tag,index) => (
                 <View key={index} style={{
                    backgroundColor:"grey",
                    padding:5,
                    borderRadius:8,
                    height:30,
                    flexDirection:"row",
                    alignSelf:"flex-start",
                    margin:2
                     }}>
                    <Text style={{marginRight:5}}>{tag}</Text>
                    <Feather onPress={()=>deleteTag(index)} name="x-circle" size={18} color="black" />
                    </View>
            ))}
            <TextInput
                    style={{ flexGrow: 1 }}
                    value={currentInput}
                    onSubmitEditing={addTag}
                    onChangeText={(text) => {
                        setCurrentInput(text)
                        props.controllerOnChange([...tags,text])
                    }}
                 
                  />
        </TagContainer>
    )

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
    margin-left:auto;
    margin-right:auto;
    borderRadius:8px;
    padding:5px;
`