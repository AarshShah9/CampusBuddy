import { View, TouchableWithoutFeedback, Pressable, ScrollView, StyleSheet } from "react-native";
import MarketplaceItem from "~/components/MarketplaceItem";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";
import { marketplaceItems } from "~/mockData/MarketplaceData";

export default function Marketplace() {
    const { dismissKeyboard } = useAppContext();

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ScrollView style={{ flex: 1 }}>
                <Pressable style={{ paddingVertical: 20 }}>
                    <ThemedText style={{ paddingLeft: 20, fontFamily: "Nunito-Bold", fontSize: 24 }}>
                        Marketplace
                    </ThemedText>
                    <View style={styles.itemsContainer}>
                    {marketplaceItems.map(item => 
                            <MarketplaceItem 
                                key={item.id}
                                title={item.name}
                                date={""}
                                location={item.location}
                                clubName={`$${item.price}`}
                                picture={item.picture}
                            />
                        )}
                    </View>
                </Pressable>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    itemsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
    }
})