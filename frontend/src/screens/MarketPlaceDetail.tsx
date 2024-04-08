import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Carousel from "pinar";
import useThemeContext from "~/hooks/useThemeContext";
import { Button } from "react-native-paper";
import LocationChip from "~/components/LocationChip";
import MapComponentSmall from "~/components/MapComponentSmall";
import React, { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import { getMarketPlaceItem } from "~/lib/apiFunctions/Items";
import { MarketPlaceItemResponse } from "~/types/MarketPlaceItem";
import Modal from "react-native-modal";
import { generateImageURL } from "~/lib/CDNFunctions";
import { convertUTCToTimeAndDate } from "~/lib/timeFunctions";
import useNavigationContext from "~/hooks/useNavigationContext";

// Image Component of marketplace detail

// TODO when the images havent been loaded the carousel just shows a blank screen and doesnt rerender when the images are loaded
// TODO Add loading skeleton
const ImageGallery = ({ images }: { images?: string[] }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalVisible(true);
  };

  return (
    <>
      <Modal
        isVisible={modalVisible}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={["down"]}
        style={styles.modal}
        propagateSwipe={true} // This prop allows inner ScrollView components to scroll as expected.
        animationOut={"slideOutDown"}
        animationInTiming={200}
        animationOutTiming={200}
        animationIn={"slideInUp"}
        avoidKeyboard={true}
        backdropColor={"black"}
        backdropOpacity={1}
        backdropTransitionInTiming={200}
        backdropTransitionOutTiming={200}
        coverScreen={true}
      >
        <View style={styles.fullScreenContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: generateImageURL(selectedImage) }}
              style={styles.fullScreenImage}
            />
          )}
        </View>
      </Modal>
      <View style={{ height: 250 }}>
        <Carousel>
          {images && images.length > 0 ? (
            images.map((item, i) => (
              <TouchableOpacity
                style={styles.ImageContainer}
                key={i}
                onPress={() => openImage(item)}
              >
                <Image
                  source={{ uri: generateImageURL(item) }}
                  style={{
                    height: 300,
                    width: "100%",
                    backgroundColor: "black",
                  }}
                />
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.ImageContainer}>
              <Text style={styles.ExampleText}>No images available</Text>
            </View>
          )}
        </Carousel>
      </View>
    </>
  );
};

// Profile Component
const Profile = (item: { name: string; userId: string }) => {
  const { theme } = useThemeContext();
  const { navigateTo } = useNavigationContext();

  const onUserPress = useCallback(() => {
    navigateTo({ page: "UserProfile", id: item.userId });
  }, [item.userId]);

  return (
    // Possibly make this pull up there profile page
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 2,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            height: 35,
            width: 35,
            backgroundColor: "red",
            borderRadius: 90,
            marginBottom: 5,
          }}
          source={require("~/assets/Campus_Buddy_Logo.png")}
        />
        <TouchableOpacity onPress={onUserPress}>
          <Text
            style={{ color: theme.colors.text, fontSize: 16, marginLeft: 8, fontFamily:"Roboto-Reg" }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        style={{
          width: 90,
          height: 40,
          backgroundColor: theme.colors.messageButtonColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.colors.text }}>Message</Text>
      </Button>
    </View>
  );
};
// Component holding details about the item
type ItemDetail = {
  title: string;
  price: string;
  createdAt: string;
  description: string;
  sellerFullName: string;
  sellerId: string;
  condition: string;
  location: string;
  latitude: number;
  longitude: number;
};

const ItemDescription = (props: ItemDetail) => {
  const { theme } = useThemeContext();
  const { navigateTo } = useNavigationContext();

  const onMapPress = useCallback(() => {
    navigateTo({
      page: "MapDetails",
      itemData: [
        {
          title: props.title,
          description: props.description,
          latitude: props.latitude,
          longitude: props.longitude,
        },
      ],
    });
  }, [
    props.latitude,
    props.longitude,
    props.title,
    props.description,
    navigateTo,
  ]);

  return (
    <View
      style={{
        width: "92%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 5,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          borderBottomColor: "#B0CFFF",
          borderBottomWidth: 1,
          marginTop: 4,
        }}
      >
        <Text style={[{ color: theme.colors.text }, styles.MainTitleText]}>
          {props.title}
        </Text>
        <Text style={[{ color: theme.colors.text }, styles.PriceText]}>
          ${props.price}
        </Text>
        <LocationChip location={props.location} size={"normal"} />
        <Text style={[{ color: theme.colors.text }, styles.DateText]}>
          Listed {convertUTCToTimeAndDate(props.createdAt)}
        </Text>
      </View>
      <View
        style={{
          marginTop: 4,
          flexDirection: "column",
          borderBottomColor: "#B0CFFF",
          borderBottomWidth: 1,
        }}
      >
         <Text
          style={[
            styles.MainTitleText,
            { color: theme.colors.text, fontSize: 18 },
          ]}
        >
          Description
        </Text>
        <Text style={[{ color: theme.colors.text }, styles.DescriptorText]}>
          {props.description}
        </Text>

        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: "#898F9C" ,
              ...styles.DescriptorText,
            }}
          >
            Condition:{" "}
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              ...styles.DescriptorText,
            }}
          >
            {props.condition}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 100,
          marginTop: 10,
          flexDirection: "column",
          borderBottomColor: "#B0CFFF",
          borderBottomWidth: 1,
        }}
      >
        <Text
          style={[
            styles.MainTitleText,
            { color: theme.colors.text, fontSize: 18 },
          ]}
        >
          Seller Information
        </Text>
        <Profile name={props.sellerFullName} userId={props.sellerId} />
      </View>
      <View
        style={{
          marginTop: 10,
          marginBottom: 15,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors.tertiary,
          paddingBottom: 60,
        }}
      >
        {props.location && (
          <TouchableOpacity onPress={onMapPress}>
            <MapComponentSmall
              latitude={props?.latitude}
              longitude={props?.longitude}
              type={"item"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

/**
 * This component is responsible for loading market details based on passed ID.
 * */
export default function MarketPlaceDetail() {
  const { theme } = useThemeContext();

  const {
    params: { id },
  } = useRoute<any>();

  const { data: marketplaceData } = useQuery<MarketPlaceItemResponse>({
    queryKey: ["marketplace-detail", id],
    queryFn: () => getMarketPlaceItem(id),
  });

  if (marketplaceData && marketplaceData.isFlagged) {
    Alert.alert(
      "Under Review",
      "This item has been flagged as it may not meet our guidelines. Please contact us if you have any questions.",
    );
  }

  return (
    <View style={{ height: "100%", backgroundColor: theme.colors.tertiary }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageGallery images={marketplaceData?.images} />
        {marketplaceData && <ItemDescription {...marketplaceData} />}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Can delete these after we get backend integration hooked up
  ImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  ExampleText: {
    color: "white",
    opacity: 0.7,
    fontSize: 28,
    fontWeight: "bold",
  },
  MainTitleText: {
    fontSize: 23,
    marginBottom: 5,
    fontFamily: "Nunito-Bold",
  },
  DescriptorText: {
    fontSize: 16,
    marginBottom: 8,
    fontFamily: "Roboto-Reg",
    marginTop: 8,
  },
  PriceText: {
    fontSize: 18,
    fontFamily: "Roboto-Reg",
    marginBottom: 8,
  },
  DateText: {
    fontSize: 14,
    marginTop: 8,
    fontFamily: "Roboto-Reg",
    marginBottom: 8,
  },
  fullScreenContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  fullScreenImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    borderRadius: 20,
    padding: 10,
    zIndex: 1,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  modal: {
    margin: 0,
    justifyContent: "center",
  },
});
