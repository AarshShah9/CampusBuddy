import { TextInput } from "react-native-paper";
import { View, Text } from "react-native";
import { StyleSheet } from "react-native";

export default function InputField(props:{name:string,placeholder?:string,function?:any, value?:string}) {
    return(
        <View style={styles.container} >
            <Text style={styles.header2}>{props.name}</Text>
            <TextInput onChangeText={props.function} style={styles.input} placeholder={props.placeholder}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        width:"100%",
        
    },
    input: {
        borderColor: "gray",
        width: "84%",
        height: 40,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginLeft:"auto",
        marginRight:"auto",
        marginBottom:"3%",
        backgroundColor:'white'
      },
    header2: {
        marginLeft:"8%",
        fontSize:16,
        marginBottom:"1%"
    }
})