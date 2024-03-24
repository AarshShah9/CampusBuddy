import { createContext, PropsWithChildren, useCallback } from "react";
import { NavigableStacks, NavigationFunctionArgs } from "~/types/Navigation";
import { StackActions, useNavigation } from "@react-navigation/native";

type contextObject = {
    navigateTo: (arg: NavigationFunctionArgs) => void
    navigateBack: () => void,
    replaceStackWith: (arg: NavigableStacks) => void,
    setNavigationOptions: (arg: any) => void
};
const NavigationContext = createContext<contextObject | null>(null);

export const NavigationContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
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

    return (
        <NavigationContext.Provider 
            value={{ 
                navigateTo, navigateBack, 
                replaceStackWith, setNavigationOptions
            }}
        >
            {children}
        </NavigationContext.Provider>
    );
};

export default NavigationContext;