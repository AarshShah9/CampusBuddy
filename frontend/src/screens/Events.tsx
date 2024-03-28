import {
  View,
  TouchableWithoutFeedback,
  ScrollView,
  Pressable,
} from "react-native";
import EventMainCard from "~/components/EventMainCard";
import { ThemedText } from "~/components/ThemedComponents";
import useAppContext from "~/hooks/useAppContext";
import { convertUTCToTimeAndDate } from "~/lib/timeFunctions";
import { useQuery } from "@tanstack/react-query";
import { getSearchPageEvents } from "~/lib/apiFunctions/Events";
import { SearchPageEventType } from "~/types/Events";

export default function Events() {
  const { dismissKeyboard } = useAppContext();

  let { data: searchPageEvents } = useQuery<SearchPageEventType[]>({
    queryKey: ["search-page-events"],
    queryFn: getSearchPageEvents,
    initialData: [],
  });

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView style={{ flex: 1 }}>
        <Pressable style={{ paddingVertical: 20 }}>
          <ThemedText
            style={{ paddingLeft: 20, fontFamily: "Nunito-Bold", fontSize: 24 }}
          >
            Events
          </ThemedText>
          <View style={{ paddingHorizontal: 20 }}>
            {searchPageEvents &&
              searchPageEvents?.map((event) => (
                <EventMainCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={convertUTCToTimeAndDate(event.startTime)}
                  location={event.location.name}
                  clubName={event.organization?.organizationName}
                  image={event.image}
                />
              ))}
          </View>
        </Pressable>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
