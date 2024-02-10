import { useContext } from "react";
import ThemeContext from "~/contexts/themeContext";

export default function useThemeContext() {
  const contextValues = useContext(ThemeContext);

  if (!contextValues)
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider",
    );

  return contextValues;
}
