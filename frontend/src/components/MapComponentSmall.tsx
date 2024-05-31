import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { StyleSheet, View, Platform } from "react-native";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { darkModeStyle } from "~/components/Map";
import useThemeContext from "~/hooks/useThemeContext";

type MapComponentProps = {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  type?: "event" | "item";
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
  type = "event",
}: MapComponentProps) => {
  const { inDarkMode, theme } = useThemeContext();

  return (
    <View>
      <View style={styles.mapBox}>
        <MapView
          provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
          pointerEvents="none"
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
          customMapStyle={inDarkMode ? darkModeStyle : []}
        >
          <Marker
            coordinate={{
              latitude,
              longitude,
            }}
          >
            <View style={circleStyles.circleStyle}>
              {type == "event" && (
                <MaterialIcons name="event-available" size={24} color="red" />
              )}
              {type == "item" && (
                <MaterialCommunityIcons
                  name="shopping-outline"
                  size={24}
                  color={theme.colors.primary}
                />
              )}
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
