import { PropsWithChildren } from "react";
import { 
    ScrollView, 
    ScrollViewProps, 
    ViewStyle,
    Text,
    StyleSheet,
    View

 } from "react-native";
 import EventHomeCard from "./EventHomeCard";
import { Section } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

type Props = {
    eventData: { title: string; items: { title: string; time: string; location: string; image: string }[] }[];
  };
  
  export default function HorizontalScrollView({ eventData }: Props) {
    return (
      <View style={{ width: 367, height: 168, marginLeft: 0, marginTop: 16 }}>
        {eventData.map((section) => (
          <View key={section.title}>
            <Text style={{ marginBottom: 16, fontSize: 16 }}>{section.title}</Text>
            <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
              {section.items.map((item, index) => (
                <EventHomeCard key={index} eventData={item} />
              ))}
            </ScrollView>
          </View>
        ))}
      </View>
    );
  }

const styles = StyleSheet.create({
    contentContainer:{
        flex: 1,
    },
})



