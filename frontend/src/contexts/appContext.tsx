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
import { NavigableStacks, NavigationFunctionArgs } from "~/types/Navigation";
import { StackActions, useNavigation } from "@react-navigation/native";

type appContext = {
    dismissKeyboard: () => void;
    getLocationPermission: () => Promise<void>;
    getLocation: () => Promise<any>;
    location: LocationObject | undefined;
    navigateTo: (arg: NavigationFunctionArgs) => void
    navigateBack: () => void,
    replaceStackWith: (arg: NavigableStacks) => void,
    setNavigationOptions: (arg: any) => void
};
const AppContext = createContext<appContext | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const { navigate, goBack, dispatch, setOptions } = useNavigation<any>();
    const navigateTo = useCallback(({ page, ...params }: NavigationFunctionArgs) => {
        navigate(page, { ...params })
    }, [navigate])
    const navigateBack = useCallback(() => {
        goBack()
    }, [])
    const replaceStackWith = useCallback((stack: NavigableStacks) => {
        dispatch(StackActions.replace(stack));
    }, [])
    const setNavigationOptions = useCallback((arg: any) => {
        setOptions(arg)
    }, [])


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
            value={{ 
                navigateTo, navigateBack, 
                replaceStackWith, setNavigationOptions,
                dismissKeyboard, getLocation, 
                getLocationPermission, location 
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export default AppContext;