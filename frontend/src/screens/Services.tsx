import { View, TouchableWithoutFeedback, Pressable, ScrollView } from "react-native";
import LookingForItem from "~/components/SearchLookingForBar";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";
import { services } from "~/mockData/ServicesData";

export default function Services() {
    const { dismissKeyboard } = useAppContext();
    
    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ScrollView style={{ flex: 1 }}>
                <Pressable style={{ paddingVertical: 20 }}>
                    <ThemedText style={{ paddingLeft: 20, fontFamily: "Nunito-Bold", fontSize: 24 }}>
                        Looking For
                    </ThemedText>
                    <View style={{ paddingHorizontal: 20 }}>
                        {services.map(service => 
                            <LookingForItem
                                key={service.id}
                                title={service.title}
                                description={service.description}
                                requiredMembers={service.spotsLeft}
                            />
                        )}
                    </View>
                </Pressable>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}