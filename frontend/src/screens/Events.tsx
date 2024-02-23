import { View, TouchableWithoutFeedback, ScrollView, Pressable } from "react-native";
import EventMainCard from "~/components/EventMainCard";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";
import useEventsContext from "~/hooks/useEventsContext";

export default function Events() {
    const { dismissKeyboard } = useAppContext();
    const { events } = useEventsContext();

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <ScrollView style={{ flex: 1 }}>
                <Pressable style={{ paddingVertical: 20 }}>
                    <ThemedText style={{ paddingLeft: 20, fontWeight: 'bold', fontSize: 24 }}>
                        Events
                    </ThemedText>
                    <View style={{ paddingHorizontal: 20 }}>
                        {events.map(event => 
                            <EventMainCard
                                key={event.id}
                                title={event.name}
                                date={event.date}
                                location={event.location}
                                clubName={event.clubName}
                                picture={event.picture}
                            />
                        )}
                    </View>
                </Pressable>
            </ScrollView>
        </TouchableWithoutFeedback>
    );
}
