import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import Carousel from "pinar";
import useThemeContext from "~/hooks/useThemeContext";

const Header = () => {
  const { theme } = useThemeContext();
  return (
    <View
      style={{
        height: 60,
        width: "100%",
        backgroundColor: theme.colors.primary,
      }}
    ></View>
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
      <View
        style={{
          width: 90,
          height: 40,
          backgroundColor: "grey",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: theme.colors.text }}>Message</Text>
      </View>
    </View>
  );
};
// Component holding details about the item
const ItemDescription = () => {
  const { theme } = useThemeContext();
  const exampleItemDetail = {
    title: "PS4",
    price: 300,
    description:
      "PS4 BRAND NEW, GOOOD STUUUF YUUUH,PS4 BRAND NEW, GOOOD STUUUF YUUUH,PS4 BRAND NEW, GOOOD STUUUF YUUUH",
    sellerFullName: "Kevin Nguyen",
    condition: "Used-good",
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
          height: 70,
          flexDirection: "column",
          borderBottomColor: theme.colors.text,
          borderBottomWidth: 1,
          marginTop:4
        }}
      >
        <Text style={[{ color: theme.colors.text }, styles.MainTitleText]}>
          {exampleItemDetail.title}
        </Text>
        <Text style={[{ color: theme.colors.text }, styles.DescriptorText]}>
          ${exampleItemDetail.price}
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
        <Text style={[{ color: theme.colors.text }, styles.MainTitleText]}>
          Description
        </Text>
        <Text style={[{ color: theme.colors.text }, styles.DescriptorText]}>
          {exampleItemDetail.description}
        </Text>
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
          height: 75,
          marginTop: 4,
          flexDirection: "column",
          borderBottomColor: theme.colors.text,
          borderBottomWidth: 1,
        }}
      >
        <Text style={[{ color: theme.colors.text }, styles.MainTitleText]}>
          Details
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ color: theme.colors.text, fontSize: 14, marginTop: 2 }}
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
    </View>
  );
};

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
    fontSize: 20,
    marginBottom: 5,
    fontFamily: "Roboto-Bold",
  },
  DescriptorText: {
    fontSize: 16,
    marginBottom: 5,
    fontFamily: "Roboto-Reg",
  },
});
