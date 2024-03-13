import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useCallback, useState } from "react";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

type MapProps = {
  latitudeDelta?: number;
  longitudeDelta?: number;
  goBackButton?: boolean;
  currentLocation?: LatLng;
  events?: any;
};

type eventType = {
  latitude: number;
  longitude: number;
  title: string;
  description: string;
  onClick: () => void;
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

  const onBack = useCallback(() => {
    goBack();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation?.latitude || 51.08660107358039,
          longitude: currentLocation?.longitude || -114.12847416818332,
          latitudeDelta,
          longitudeDelta,
        }}
        showsUserLocation={true}
      >
        {events &&
          events.map((event: any) => {
            return (
              <Marker
                key={event.title}
                coordinate={{
                  latitude: event.latitude,
                  longitude: event.longitude,
                }}
                onPress={event.onClick}
                title={event.title}
                description={event.description}
              />
            );
          })}
      </MapView>
      {goBackButton && <Button title={"Back"} onPress={onBack} />}
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
