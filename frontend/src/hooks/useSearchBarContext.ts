import { useContext } from "react";
import SearchBarContext from "~/contexts/searchBarContext";

export default function useSearchBarContext() {
  const contextValues = useContext(SearchBarContext);

  if (!contextValues)
    throw new Error(
      "useSearchBarContext must be used within a SearchBarContextProvider",
    );

  return contextValues;
}