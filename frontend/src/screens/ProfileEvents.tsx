import { FlatList, Image, TouchableOpacity, View } from "react-native";
import { ThemedText } from "~/components/ThemedComponents";
import HorizontalScrollElement from "~/components/HorizontalScrollElement";
import Carousel from "pinar";
import { generateImageURL } from "~/lib/CDNFunctions";

export default function ProfileEvents() {
  const events = [
    {
      title: "Attending",
      id: "1",
      items: [
        {
          id: "1",
          title: "Crowchild Classic",
          time: "Jan 27",
          location: "Saddledome",
          image: "https://d2epenzoyf672m.cloudfront.net/pfp/hockeyAd.jpg",
        },
      ],
    },
    {
      title: "Past Events",
      id: "2",
      items: [
        {
          id: "2",
          title: "Weekly Bouldering",
          time: "Jan 4",
          location: "UofC Kines Block",
          image: "https://d2epenzoyf672m.cloudfront.net/pfp/bouldering.jpg",
          event: true,
        },
        {
          id: "3",
          title: "Volleyball Tournament",
          time: "Jan 14",
          location: "UofC Kines Block",
          image:
            "https://d2epenzoyf672m.cloudfront.net/pfp/basketball_tournament.jpg",
          event: true,
        },
        {
          id: "4",
          title: "Networking Night",
          time: "Jan 15",
          location: "MacHall",
          image: "https://d2epenzoyf672m.cloudfront.net/pfp/networkingWeb.png",
          event: true,
        },
      ],
    },
  ];

  return (
    <View>
      <FlatList
        data={events as any}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <HorizontalScrollElement item={item} isLoading={false} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20 }}
      />
    </View>
  );
}
