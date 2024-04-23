import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Keyboard } from "react-native";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";

type appContext = {
  dismissKeyboard: () => void;
  getLocationPermission: () => Promise<void>;
  getLocation: () => Promise<() => void>;
  location: LocationObject | undefined;
};

const AppContext = createContext<appContext | null>(null);

export const AppContextProvider = ({
  children,
}: PropsWithChildren<any>): JSX.Element => {
  const [location, setLocation] = useState<LocationObject>();
  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const getLocationPermission = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
  }, []);

  const getLocation = useCallback(async () => {
    const lastKnownLocation = await Location.getLastKnownPositionAsync({});
    if (lastKnownLocation) {
      setLocation(lastKnownLocation);
    }

    const updateFrequency = 100000; // Update frequency in milliseconds
    let lastUpdateTime = Date.now();

    const subscriber = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        distanceInterval: 10,
        timeInterval: 5000,
      },
      (newLocation) => {
        const now = Date.now();
        if (now - lastUpdateTime >= updateFrequency) {
          setLocation(newLocation);
          lastUpdateTime = now;
        }
      },
    );
    return () => subscriber.remove();
  }, []);

  useEffect(() => {
    (async () => {
      await getLocationPermission();
      await getLocation();
    })();
  }, [getLocation, getLocationPermission]);

  return (
    <AppContext.Provider
      value={{ dismissKeyboard, getLocation, getLocationPermission, location }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
