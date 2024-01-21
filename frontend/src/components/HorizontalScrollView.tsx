import { PropsWithChildren } from "react";
import { 
    ScrollView, 
    ScrollViewProps, 
    ViewStyle,
    Text,
    StyleSheet,
    View

 } from "react-native";
type Props = PropsWithChildren<{
    scrollTitle: string
}>

export default function HorizontalScrollView({ scrollTitle, children }: Props){
    return (
        <View style={{width:367, height:168, marginLeft:0, marginTop:16}}>
            <Text style={{marginBottom:16, fontSize: 16}}>{scrollTitle}</Text>
            <ScrollView  horizontal contentContainerStyle={styles.contentContainer}>
                {children}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer:{
        flex: 1,
    },
})



