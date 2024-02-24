import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useCallback } from "react";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

type MapProps = {
  latitude: number;
  longitude: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
  title?: string;
  description?: string;
};

// This is a simple map component that displays a map with a marker at the given latitude and longitude.
// This fills the entire screen and has a back button to return to the previous screen.
const Map = ({
  latitude,
  longitude,
  latitudeDelta = 0.01,
  longitudeDelta = 0.01,
  title,
  description,
}: MapProps) => {
  const { goBack } = useNavigation();

  const onBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
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
      <Button title={"Back"} onPress={onBack} />
    </View>
  );
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

export default Map;
