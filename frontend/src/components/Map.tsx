import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import React, { useCallback } from "react";
import { Button, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { EventMapItem } from "~/types/Events";

type MapProps = {
  latitudeDelta?: number;
  longitudeDelta?: number;
  goBackButton?: boolean;
  currentLocation: LatLng;
  events?: EventMapItem[];
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
                coordinate={{
                  latitude: event.latitude,
                  longitude: event.longitude,
                }}
                onPress={() => openEventDetails(index)}
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
