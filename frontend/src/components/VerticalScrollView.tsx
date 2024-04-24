import {
  FlatList,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";
import Carousel from "pinar";
import { useCallback, useEffect, useState } from "react";
import useLoadingContext from "~/hooks/useLoadingContext";
import { CarousalItem, EventData } from "~/types/Events";
import { generateImageURL } from "~/lib/CDNFunctions";
import useNavigationContext from "~/hooks/useNavigationContext";
import { getMainEvents } from "~/lib/apiFunctions/Events";

export default function VerticalScrollComponent() {
  const screenWidth = Dimensions.get("window").width;
  const { startLoading, stopLoading } = useLoadingContext();
  const [events, setEvents] = useState<EventData[]>([]);
  const [startingEvents, setStartingEvents] = useState<CarousalItem[]>([]);

  useEffect(() => {
    startLoading();
    getMainEvents().then((res) => {
      setEvents(res.data.allEvents);
      setStartingEvents(res.data.startingEvents);
      stopLoading();
    });
  }, []);

  const { navigateTo } = useNavigationContext();

  const openEventDetails = useCallback(
    (id: string) => {
      navigateTo({ page: "EventDetails", id });
    },
    [events],
  );

  return (
    <FlatList
      data={events}
      renderItem={HorizontalScrollElement}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <View
          style={{
            justifyContent: "center",
            marginBottom: 32,
            alignItems: "center",
          }}
        >
          <Carousel
            loop={true}
            autoplay={true}
            autoplayInterval={5000}
            showsControls={false}
            style={{
              width: screenWidth,
              height: 214,
            }}
          >
            {startingEvents.map((item) => (
              <TouchableOpacity
                key={item.image}
                onPress={() => openEventDetails(item.id)}
              >
                <Image
                  key={item.image}
                  source={{ uri: generateImageURL(item.image) }}
                  style={{ width: screenWidth, height: 214 }}
                />
              </TouchableOpacity>
            ))}
          </Carousel>
        </View>
      }
    />
  );
}
