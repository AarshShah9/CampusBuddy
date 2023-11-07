import { createContext } from "react";
import type { PropsWithChildren } from 'react';
import { 
    DefaultTheme as PaperDefaultTheme,
    MD3LightTheme, MD3DarkTheme, 
    adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from "@react-navigation/native"
import { useColorScheme } from "react-native";

const lightColors = {
    "colors": {
      "primary": "rgb(0, 97, 164)",
      "onPrimary": "rgb(255, 255, 255)",
      "primaryContainer": "rgb(209, 228, 255)",
      "onPrimaryContainer": "rgb(0, 29, 54)",
      "secondary": "rgb(0, 93, 182)",
      "onSecondary": "rgb(255, 255, 255)",
      "secondaryContainer": "rgb(214, 227, 255)",
      "onSecondaryContainer": "rgb(0, 27, 61)",
      "tertiary": "rgb(0, 101, 144)",
      "onTertiary": "rgb(255, 255, 255)",
      "tertiaryContainer": "rgb(200, 230, 255)",
      "onTertiaryContainer": "rgb(0, 30, 47)",
      "error": "rgb(186, 26, 26)",
      "onError": "rgb(255, 255, 255)",
      "errorContainer": "rgb(255, 218, 214)",
      "onErrorContainer": "rgb(65, 0, 2)",
      "background": "rgb(253, 252, 255)",
      "onBackground": "rgb(26, 28, 30)",
      "surface": "rgb(253, 252, 255)",
      "onSurface": "rgb(26, 28, 30)",
      "surfaceVariant": "rgb(223, 226, 235)",
      "onSurfaceVariant": "rgb(67, 71, 78)",
      "outline": "rgb(115, 119, 127)",
      "outlineVariant": "rgb(195, 198, 207)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(47, 48, 51)",
      "inverseOnSurface": "rgb(241, 240, 244)",
      "inversePrimary": "rgb(159, 202, 255)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(240, 244, 250)",
        "level2": "rgb(233, 240, 248)",
        "level3": "rgb(225, 235, 245)",
        "level4": "rgb(223, 233, 244)",
        "level5": "rgb(218, 230, 242)"
      },
      "surfaceDisabled": "rgba(26, 28, 30, 0.12)",
      "onSurfaceDisabled": "rgba(26, 28, 30, 0.38)",
      "backdrop": "rgba(44, 49, 55, 0.4)"
    }
  }

const darkColors = {
    "colors": {
      "primary": "rgb(159, 202, 255)",
      "onPrimary": "rgb(0, 50, 88)",
      "primaryContainer": "rgb(0, 73, 125)",
      "onPrimaryContainer": "rgb(209, 228, 255)",
      "secondary": "rgb(169, 199, 255)",
      "onSecondary": "rgb(0, 48, 99)",
      "secondaryContainer": "rgb(0, 70, 139)",
      "onSecondaryContainer": "rgb(214, 227, 255)",
      "tertiary": "rgb(136, 206, 255)",
      "onTertiary": "rgb(0, 52, 77)",
      "tertiaryContainer": "rgb(0, 76, 110)",
      "onTertiaryContainer": "rgb(200, 230, 255)",
      "error": "rgb(255, 180, 171)",
      "onError": "rgb(105, 0, 5)",
      "errorContainer": "rgb(147, 0, 10)",
      "onErrorContainer": "rgb(255, 180, 171)",
      "background": "rgb(26, 28, 30)",
      "onBackground": "rgb(226, 226, 230)",
      "surface": "rgb(26, 28, 30)",
      "onSurface": "rgb(226, 226, 230)",
      "surfaceVariant": "rgb(67, 71, 78)",
      "onSurfaceVariant": "rgb(195, 198, 207)",
      "outline": "rgb(141, 145, 153)",
      "outlineVariant": "rgb(67, 71, 78)",
      "shadow": "rgb(0, 0, 0)",
      "scrim": "rgb(0, 0, 0)",
      "inverseSurface": "rgb(226, 226, 230)",
      "inverseOnSurface": "rgb(47, 48, 51)",
      "inversePrimary": "rgb(0, 97, 164)",
      "elevation": {
        "level0": "transparent",
        "level1": "rgb(33, 37, 41)",
        "level2": "rgb(37, 42, 48)",
        "level3": "rgb(41, 47, 55)",
        "level4": "rgb(42, 49, 57)",
        "level5": "rgb(45, 52, 62)"
      },
      "surfaceDisabled": "rgba(226, 226, 230, 0.12)",
      "onSurfaceDisabled": "rgba(226, 226, 230, 0.38)",
      "backdrop": "rgba(44, 49, 55, 0.4)"
    }
  }

const { LightTheme: PaperLightTheme, DarkTheme: PaperDarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme, reactNavigationDark: NavigationDarkTheme
})

const lightTheme = {
    //...MD3LightTheme,
    ...PaperLightTheme,
    colors: {
        //...MD3LightTheme.colors,
        ...PaperLightTheme.colors,
        ...lightColors.colors
    },
}

const darkTheme = {
    //...MD3DarkTheme,
    ...PaperDarkTheme,
    colors: {
        //...MD3DarkTheme.colors,
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