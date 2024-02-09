import type {PropsWithChildren} from 'react';
import {createContext} from "react";
import {adaptNavigationTheme, PaperProvider} from 'react-native-paper';
import {DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from "@react-navigation/native"
import {useColorScheme} from "react-native";
import lightColors from "~/themeColors/lightColors";
import darkColors from "~/themeColors/darkColors";

const { LightTheme: PaperLightTheme, DarkTheme: PaperDarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme, reactNavigationDark: NavigationDarkTheme
})

const lightTheme = {
    ...PaperLightTheme,
    colors: {
        ...PaperLightTheme.colors,
        ...lightColors.colors
    },
}

const darkTheme = {
    ...PaperDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...darkColors.colors
    }
}

type AppTheme = (typeof lightTheme) | (typeof darkTheme);
type themeContext = { theme: AppTheme, inDarkMode: boolean };
const ThemeContext = createContext<themeContext | null>(null);

export const ThemeContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const inDarkMode = useColorScheme() === 'dark';
    const theme = inDarkMode ? darkTheme : lightTheme

    return (
        <PaperProvider theme={theme}>
            <ThemeContext.Provider value={{ theme, inDarkMode }}>
                {children}
            </ThemeContext.Provider>
        </PaperProvider>
    )
}

export default ThemeContext;