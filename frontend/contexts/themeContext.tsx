import { createContext } from "react";
import type { PropsWithChildren } from 'react';
import { MD3LightTheme, MD3DarkTheme, adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { DarkTheme, DefaultTheme } from "@react-navigation/native"
import { useColorScheme } from "react-native";


const { LightTheme, DarkTheme: PaperDarkTheme } = adaptNavigationTheme({
    reactNavigationLight: DefaultTheme, reactNavigationDark: DarkTheme
})

const lightTheme = {
    ...MD3LightTheme,
    ...LightTheme,
    colors: {
        ...MD3LightTheme,
        ...LightTheme.colors
    }
}

const darkTheme = {
    ...MD3DarkTheme,
    ...PaperDarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        ...PaperDarkTheme.colors
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