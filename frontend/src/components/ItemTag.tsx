import { View, Text} from "react-native";
import { Feather } from '@expo/vector-icons';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

export default function ItemTag(props: { title: string}) {

    return(
        <View style={{
            backgroundColor:"grey",
            padding:5,
            borderRadius:8,
            height:30,
            flexDirection:"row",
            alignSelf:"flex-start",
            marginRight:2
        }}>
            <Text style={{marginRight:5}}>{props.title}</Text>
            <Feather name="x-circle" size={18} color="black" />
        </View>
    )

}