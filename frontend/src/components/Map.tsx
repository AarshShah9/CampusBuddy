import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useCallback } from "react";
import { View, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EventMapItem } from "~/types/Events";
import { MaterialIcons } from "@expo/vector-icons";

type MapProps = {
  latitudeDelta?: number;
  longitudeDelta?: number;
  goBackButton?: boolean;
  currentLocation: LatLng;
  events?: EventMapItem[];
};

// This is a simple map component that displays a map with a marker at the given latitude and longitude.
// This fills the entire screen and has a back button to return to the previous screen.
const Map = ({
  latitudeDelta = 0.01,
  longitudeDelta = 0.01,
  goBackButton = false,
  currentLocation,
  events,
}: MapProps) => {
  const { goBack } = useNavigation();
  const navigation = useNavigation<any>();

  const onBack = useCallback(() => {
    goBack();
  }, []);

  const openEventDetails = useCallback(
    (index: number) => {
      navigation.navigate("EventDetails", {
        id: events?.[index].id,
      });
    },
    [events, navigation],
  );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        showsUserLocation={true}
      >
        {events &&
          events.map((event: EventMapItem, index) => {
            return (
              <Marker
                key={event.title}
                coordinate={adjustPosition(event, index, events)}
                onPress={() => openEventDetails(index)}
              >
                <View style={circleStyles.circleStyle}>
                  <MaterialIcons name="event-available" size={24} color="red" />
                </View>
              </Marker>
            );
          })}
      </MapView>
      {goBackButton && <Button title={"Back"} onPress={onBack} />}
    </View>
  );
};

const adjustPosition = (
  event: EventMapItem,
  index: number,
  events: EventMapItem[],
) => {
  const adjustment = 0.0001; // Small adjustment value
  let duplicates = events.filter(
    (e) => e.latitude === event.latitude && e.longitude === event.longitude,
  );
  if (duplicates.length > 1) {
    let angle = (360 / duplicates.length) * index; // distribute evenly in a circle
    return {
      latitude: event.latitude + adjustment * Math.cos(angle * (Math.PI / 180)),
      longitude:
        event.longitude + adjustment * Math.sin(angle * (Math.PI / 180)),
    };
  }
  return {
    latitude: event.latitude,
    longitude: event.longitude,
  };
};

// prettier-ignore
const styles = {
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
};

const circleStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  circleStyle: {
    backgroundColor: "white", // TODO change to theme color based on dark/light mode
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Map;
