import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React from "react";
import { StyleSheet, View } from "react-native";

type MapComponentProps = {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  title?: string;
  description?: string;
};

/*
 * This is a simple map component that displays a map with a marker at the given latitude and longitude.
 * This only fills a small portion of the screen to integrate with other components.
 */
const Map = ({
  latitude,
  latitudeDelta,
  longitudeDelta,
  longitude,
  title,
  description,
}: MapComponentProps) => {
  latitudeDelta = latitudeDelta || 0.01;
  longitudeDelta = longitudeDelta || 0.01;

  return (
    <View>
      <View style={styles.mapBox}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta,
            longitudeDelta,
          }}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
            title={title}
            description={description}
          />
        </MapView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapBox: {
    width: 350,
    height: 200,
    borderRadius: 10,
    overflow: "hidden", // Ensure the map respects the border radius
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default Map;
