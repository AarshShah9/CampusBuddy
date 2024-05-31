import { useContext } from "react";
import AppContext from "~/contexts/appContext";

export default function useAppContext() {
  const contextValues = useContext(AppContext);

  if (!contextValues)
    throw new Error(
      "useAppContext must be used within a AppContextProvider wrapped around the App",
    );

  return contextValues;
}
