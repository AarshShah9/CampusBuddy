import { useContext } from "react";
import NavigationContext from "~/contexts/navigationContext";

export default function useNavigationContext() {
  const contextValues = useContext(NavigationContext);

  if (!contextValues)
    throw new Error(
      "useNavigationContext must be used within a NavigationContextProvider",
    );

  return contextValues;
}