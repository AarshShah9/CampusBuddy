import { URL } from "@env";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import React, { useState } from "react";
import { Button, Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Card, Chip } from "react-native-paper";
import HorizontalScrollView from "~/components/HorizontalScrollView";
import { ThemedText } from "~/components/ThemedComponents";
import useLoadingContext from "~/hooks/useLoadingContext";

const sampleEventData = [
  {
    title: 'Attending',
    items: [
      {
        title: 'Crowchild Classic',
        time: 'Jan 27',
        location: 'Saddledome',
        image: ''
      }
    ]
  },
  {
    title: 'Upcoming Events From Following',
    items: [
      {
        title: 'Weekly Bouldering',
        time: 'Jan 4',
        location: 'UofC Kines Block',
        image: ''
      },
      {
        title: 'Volleyball Tournament',
        time: 'Jan 14',
        location: 'UofC Kines Block',
        image: ''
      },
      {
        title: 'Networking Night',
        time: 'Jan 15',
        location: 'MacHall',
        image: ''
      }
    ]
  },
  {
    title: 'Trending Events',
    items: [
      {
        title: 'Law School Info Night',
        time: 'Jan 1',
        location: 'Virtual',
        image: ''
      },
      {
        title: 'Spikeball 4 Cause',
        time: 'Jan 14',
        location: 'Confederation Park',
        image: ''
      },
      {
        title: 'Career Fair',
        time: 'Jan 20',
        location: 'MacHall',
        image: ''
      }
    ]
  },
  {
    title: 'Happening Today',
    items: [
      {
        title: 'Cowboys - DJ Event',
        host: 'Cowboys Club and Casino',
        location: 'Cowboys Calgary',
        image: ''
      },
      {
        title: 'Bake Sale',
        host: 'Charity Club',
        location: 'Earth Sciences',
        image: ''
      },
      {
        title: 'CS Winter Opener',
        host: 'CSUS',
        location: 'Math Science',
        image: ''
      }
    ]
  },
  {
    title: 'Explore Verified Organizations',
    items: [
      {
        title: 'Cowboys Calgary',
        image: ''
      },
      {
        title: 'TechStart',
        image: ''
      },
      {
        title: 'Bouldering Club',
        image: ''
      }
    ]
  }
];



export default function Home() {
  const { startLoading, stopLoading } = useLoadingContext();
  const [image, setImage] = useState<string>();

  const testCallback = async () => {
    fetch(URL + "/Test")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  const { navigate } = useNavigation<any>();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await UploadImage(result.assets[0]);

      return;
    }
    console.log(result);
  };

  const UploadImage = async (selectedImage: ImagePickerAsset) => {
    const uri =
      Platform.OS === "android"
        ? selectedImage.uri
        : selectedImage.uri.replace("file://", "");
    const filename = selectedImage.uri.split("/").pop();
    const match = /\.(\w+)$/.exec(filename as string);
    const ext = match?.[1];
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    formData.append("file", {
      uri,
      name: `image.${ext}`,
      type,
    } as any);
    try {
      const { data } = await axios.post(`${URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image Uploaded");
    } catch (err) {
      console.log(err);
      alert("Something went wrong in the Upload Function!");
    }
  };

  return (
    <ScrollView>
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{height:214, width:326, backgroundColor:'red', margin:14}}>
        
      </View>
      {/* <ThemedText>Open up App.tsx to start working on your app!</ThemedText>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title={"Test"} onPress={testCallback} />
      <View style={styles.mockEventsContainer}>
        <Card
          style={styles.mockEventContainer}
          mode="elevated"
          onPress={() => {
            navigate("EventDetails", { eventNumber: 1 });
          }}
        >
          <Card.Content style={{ alignItems: "center" }}>
            <ThemedText>Mock Event 1</ThemedText>
          </Card.Content>
        </Card>
        <Card
          style={styles.mockEventContainer}
          mode="elevated"
          onPress={() => {
            navigate("EventDetails", { eventNumber: 2 });
          }}
        >
          <Card.Content style={{ alignItems: "center" }}>
            <ThemedText>Mock Event 2</ThemedText>
          </Card.Content>
        </Card>
      </View> */}

      <View>
        <HorizontalScrollView eventData={sampleEventData}>
        </HorizontalScrollView>
        
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mockEventsContainer: {
    marginTop: 16,
    display: "flex",
    flexDirection: "row",
    width: "95%",
    height: "auto",
    justifyContent: "space-around",
    alignItems: "center",
  },
  mockEventContainer: {
    width: 100,
    height: 100,
    justifyContent: "center",
  },
  ScrollContainer: {
    paddingTop: 16,
    paddingBottom: 16,
}, 
scrollHeader: {
    textAlign:'left',
},
});
