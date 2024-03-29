import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Carousel from "pinar";
import useThemeContext from "~/hooks/useThemeContext";
import { Button } from "react-native-paper";
import LocationChip from "~/components/LocationChip";
import MapComponentSmall from "~/components/MapComponentSmall";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import useNavigationContext from "~/hooks/useNavigationContext";

const Header = () => {
  const { theme } = useThemeContext();
  const { navigateTo, navigateBack } = useNavigationContext();
  return (
    <View
      style={{
        height: 60,
        width: "100%",
        backgroundColor: theme.colors.primary,
        justifyContent: "space-between",
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
       <TouchableOpacity onPress={navigateBack}>
          <AntDesign name="caretleft" size={24} color="white" />
        </TouchableOpacity>
    </View>
  );
};
// Image Component of marketplace detail
const ImageGallery = () => {
  const { theme } = useThemeContext();
  const example = [1, 2, 3];
  // Users image will be loaded into the carousel 
  return (
    <View style={{ height: 300 }}>
      <Carousel>
        {example.map((item) => {
          return (
            <View style={styles.ExampleContainer}>
              <Text style={styles.ExampleText}>{item}</Text>
            </View>
          );
        })}
      </Carousel>
    </View>
  );
};

// Profile Component
const Profile = (item: { name: string }) => {
  const { theme } = useThemeContext();
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
            height: 30,
            width: 30,
            backgroundColor: "red",
            borderRadius: 90,
            marginBottom: 5,
          }}
          source={require("~/assets/Campus_Buddy_Logo.png")}
        />
        <Text style={{ color: theme.colors.text, fontSize: 16, marginLeft: 5 }}>
          {item.name}
        </Text>
      </View>
      <Button
        style={{
          width: 90,
          height: 40,
          backgroundColor: "#afafaf",
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
const ItemDescription = () => {
  const { theme } = useThemeContext();
  const exampleItemDetail = {
    title: "M1 Macbook Air",
    price: 300,
    createdAt: new Date(),
    description:
      "PS4 BRAND NEW, GOOOD STUUUF YUUUH,PS4 BRAND NEW, GOOOD STUUUF YUUUH,PS4 BRAND NEW, GOOOD STUUUF YUUUH",
    sellerFullName: "Kevin Nguyen",
    condition: "Used-good",
    location: {
      latitude: 51,
      longitude: 114,
      name: "Calgary",
      placeId: "Calgary",
    },
  };
  return (
    <View
      style={{
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 5,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          borderBottomColor: theme.colors.text,
          borderBottomWidth: 1,
          marginTop:4
        }}
      >
        <Text style={[{ color: theme.colors.text }, styles.MainTitleText]}>
          {exampleItemDetail.title}
        </Text>
        <Text style={[{ color: theme.colors.text }, styles.PriceText]}>
          ${exampleItemDetail.price}
        </Text>
        <LocationChip location={exampleItemDetail.location.name} size={"normal"}/>
        <Text style={[{ color: theme.colors.text }, styles.DateText]}>
          Listed {exampleItemDetail.createdAt.toDateString()}
        </Text>
      </View>
      <View
        style={{
          minHeight: 100,
          marginTop: 4,
          flexDirection: "column",
          borderBottomColor: theme.colors.text,
          borderBottomWidth: 1,
        }}
      >
        <Text style={[{ color: theme.colors.text }, styles.DescriptorText]}>
          {exampleItemDetail.description}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ color: theme.colors.text, fontSize: 14, marginTop: 2, marginLeft:10 }}
          >
            Condition:
          </Text>
          <Text
            style={{
              color: theme.colors.text,
              fontSize: 14,
              marginTop: 2,
              marginLeft: 20,
            }}
          >
            {exampleItemDetail.condition}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: 100,
          marginTop: 4,
          flexDirection: "column",
          borderBottomColor: theme.colors.text,
          borderBottomWidth: 1,
        }}
      >
        <Text style={[{ color: theme.colors.text }, styles.MainTitleText]}>
          Seller Information
        </Text>
        <Profile name={exampleItemDetail.sellerFullName} />
      </View>
      <View
          style={{
            marginTop:10,
            marginBottom:15,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.colors.tertiary,
          }}
        >
            <TouchableOpacity onPress={()=>{console.log("pressed")}}>
              <MapComponentSmall
                latitude={exampleItemDetail?.location.latitude}
                longitude={exampleItemDetail?.location.longitude}
              />
            </TouchableOpacity>
        </View>
    </View>
    
  );
};

/**
 * This component is responsible for loading market details based on passed ID.
 * */
export default function MarketPlaceDetail() {
  const { theme } = useThemeContext();
  return (
    <View style={{ height: "100%", backgroundColor: theme.colors.tertiary }}>
      <Header />
      <ScrollView>
        <ImageGallery />
        <ItemDescription />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // Can delete these after we get backend integration hooked up
  ExampleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a3c9a8",
  },
  ExampleText: {
    color: "#1f2d3d",
    opacity: 0.7,
    fontSize: 48,
    fontWeight: "bold",
  },
  MainTitleText: {
    fontSize: 23,
    marginBottom: 5,
    fontFamily: "Roboto-Medium",
  },
  DescriptorText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Roboto-Reg",
    marginLeft:10,
    marginTop:5
  },
  PriceText: {
    fontSize: 20,
    fontFamily: "Roboto-Bold",
    marginBottom:5
  },
  DateText:{
    fontSize:14,
    marginTop:5,
    fontFamily: "Roboto-Reg",
    marginBottom:5
  }
});
