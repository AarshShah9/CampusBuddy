import { useContext } from "react";
import LoadingContext from "~/contexts/loadingContext";

export default function useLoadingContext() {
  const contextValues = useContext(LoadingContext);

  if (!contextValues)
    throw new Error(
      "useLoadingContext must be used within a LoadingContextProvider",
    );

  return contextValues;
}
