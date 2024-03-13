import type { PropsWithChildren } from "react";
import { createContext, useCallback } from "react";
import { Keyboard } from "react-native";
import * as Location from "expo-location";

type appContext = {
  dismissKeyboard: () => void;
  getLocationPermission: () => Promise<void>;
  getLocation: () => Promise<any>;
};
const AppContext = createContext<appContext | null>(null);

export const AppContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
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
    return await Location.getCurrentPositionAsync({});
  }, []);

  return (
    <AppContext.Provider
      value={{ dismissKeyboard, getLocation, getLocationPermission }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
