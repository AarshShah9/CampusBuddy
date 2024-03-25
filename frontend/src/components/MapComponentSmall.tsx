import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type MapComponentProps = {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};

/*
 * This is a simple map component that displays a map with a marker at the given latitude and longitude.
 * This only fills a small portion of the screen to integrate with other components.
 */
const Map = ({
  latitude,
  latitudeDelta = 0.045,
  longitudeDelta = 0.045,
  longitude,
}: MapComponentProps) => {
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
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
          zoomTapEnabled={false}
          zoomControlEnabled={false}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          >
            <View style={circleStyles.circleStyle}>
              <MaterialIcons name="event-available" size={24} color="red" />
            </View>
          </Marker>
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
    width: 350, // TODO make this responsive to screen size
    height: 150, // TODO make this responsive to screen size
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

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
