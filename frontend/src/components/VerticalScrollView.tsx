import { FlatList, View, Image, Dimensions } from "react-native";
import eventData from "~/mockData/EventData";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";
import Carousel from "pinar";

// Props Type for the Data for the Cards
export type Item = {
    id: string;
    title: string;
    time?: string;
    location: string;
    image: string;
};

// Mock data for the images being used  -> will be changed with future implementation
const images = [
    "https://picsum.photos/700",
    "https://picsum.photos/600",
    "https://picsum.photos/800",
    "https://picsum.photos/900",
];

// This component renders a vertical scrollable list with a carousel as the header.
export default function VerticalScrollComponent() {
    const data2 = eventData;
    const screenWidth = Dimensions.get("window").width;

    return (
        <FlatList
            // passes data2 as the data source
            data={data2}
            //renders each item using a horizontal scroll component
            renderItem={HorizontalScrollElement}
            // provides each item a unique key
            keyExtractor={(item) => item.id}
            //Renders a carousel as the header of the list
            ListHeaderComponent={
                <View
                    style={{
                        justifyContent: "center",
                        marginBottom: 32,
                        alignItems: "center",
                    }}
                >
                    {/* Carousel component renders a slideshow */}

                    <Carousel
                        loop={true}
                        autoplay={true}
                        autoplayInterval={5000}
                        showsControls={false}
                        style={{ height: 214, width: screenWidth,overflow: 'hidden' }}
                    >
                        {/* Renders each image in the slideshow */}

                        {images.map((imageUrl, index) => (
                            <Image
                                key={index}
                                source={{ uri: imageUrl }}
                                style={{ width: screenWidth, height: 214 }}
                            />
                        ))}
                    </Carousel>
                </View>
            }
        />
    );
}