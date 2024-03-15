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
  getLocation: () => Promise<any>;
  location: LocationObject | undefined;
};
const AppContext = createContext<appContext | null>(null);

export const AppContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const dismissKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);
  const [location, setLocation] = useState<LocationObject>();

  const getLocationPermission = useCallback(async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
  }, []);

  const getLocation = useCallback(async () => {
    return await Location.getCurrentPositionAsync({});
  }, []);

  useEffect(() => {
    (async () => {
      await getLocationPermission();
      await getLocation().then((res) => {
        setLocation(res);
      });
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{ dismissKeyboard, getLocation, getLocationPermission, location }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
