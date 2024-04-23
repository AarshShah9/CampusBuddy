import { createContext, PropsWithChildren, useCallback, useState } from "react";
import { CurrentMainTab, DuplicatedScreen, NavigableStacks, NavigationFunctionArgs } from "~/types/Navigation";
import { StackActions, useNavigation, useNavigationState } from "@react-navigation/native";

type contextObject = {
    navigateTo: (arg: NavigationFunctionArgs) => void
    navigateBack: () => void,
    replaceStackWith: (arg: NavigableStacks) => void,
    setNavigationOptions: (arg: any) => void,
    updateCurrentMaintab: (arg: CurrentMainTab) => void
};
const NavigationContext = createContext<contextObject | null>(null);

const duplicatedScreens: DuplicatedScreen[] = ["UserProfile", "EventDetails", "LookingForDetails", "LookingForCommentsScreen", "MarketPlaceDetail", "Attendees", "MapDetails", "OrganizationProfile", "EditEvent", "QRCodeScanner", "EventPricing", "EventPayment"]

export const NavigationContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [currentMainTab, setCurrentMainTab] = useState<CurrentMainTab>("Home");
    const updateCurrentMaintab = useCallback((arg: CurrentMainTab) => {
        setCurrentMainTab(arg)
    }, [])

    const { navigate, goBack, dispatch, setOptions } = useNavigation<any>();
    const navigateTo = useCallback(({ page, ...params }: NavigationFunctionArgs) => {
        let pageToRoute: string = page;
        if(duplicatedScreens.includes(page as any)) {
            pageToRoute = `${page}-${currentMainTab}`;
        }
        navigate(pageToRoute, { ...params })
    }, [navigate, currentMainTab])
    const navigateBack = useCallback(() => {
        goBack()
    }, [])
    const replaceStackWith = useCallback((stack: NavigableStacks) => {
        dispatch(StackActions.replace(stack));
    }, [])
    const setNavigationOptions = useCallback((arg: any) => {
        setOptions(arg)
    }, [])

    return (
        <NavigationContext.Provider 
            value={{ 
                navigateTo, navigateBack, updateCurrentMaintab,
                replaceStackWith, setNavigationOptions
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContext;