import { FlatList, View, Image, Dimensions, Text } from "react-native";
import { carouselImages } from "~/mockData/EventData";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";
import Carousel from "pinar";
import { useCallback, useEffect, useState } from "react";
import useLoadingContext from "~/hooks/useLoadingContext";
import useEventsContext from "~/hooks/useEventsContext";
import { EventData } from "~/types/Events";

export default function VerticalScrollComponent() {
  const screenWidth = Dimensions.get("window").width;
  const { startLoading, stopLoading } = useLoadingContext();
  const { getMainEvents } = useEventsContext();
  const [events, setEvents] = useState<EventData[]>([]);
  const [startingEvents, setStartingEvents] = useState<string[]>([]);

  useEffect(() => {
    // startLoading(); // TODO bring back loading
    getMainEvents().then((res) => {
      setEvents(res.data.allEvents);
      setStartingEvents(res.data.startingEvents);
      // stopLoading(); // TODO bring back loading
    });
  }, []);

  const generateImageURL = useCallback((image: string) => {
    if (image.includes("cloudfront")) return image;
    return `https://d2epenzoyf672m.cloudfront.net/${image}`;
  }, []);

  return (
    <>
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
              {startingEvents.map((image) => (
                <Image
                  key={image}
                  source={{ uri: generateImageURL(image) }}
                  style={{ width: screenWidth, height: 214 }}
                />
              ))}
            </Carousel>
          </View>
        }
      />
    </>
  );
}
