import { FlatList, View, Image, Dimensions } from "react-native";
import { sampleEventData, carouselImages } from "~/mockData/EventData";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";
import Carousel from "pinar";
import { useEffect } from "react";
import useLoadingContext from "~/hooks/useLoadingContext";
import useEventsContext from "~/hooks/useEventsContext";

export default function VerticalScrollComponent() {
  const screenWidth = Dimensions.get("window").width;
  const { startLoading, stopLoading } = useLoadingContext();
  const { getMainEvents } = useEventsContext();

  useEffect(() => {
    const events = getMainEvents();
  }, []);

  return (
    <FlatList
      data={sampleEventData}
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
            {carouselImages.map((image) => (
              <Image
                key={image}
                source={{ uri: image }}
                style={{ width: screenWidth, height: 214 }}
              />
            ))}
          </Carousel>
        </View>
      }
    />
  );
}
