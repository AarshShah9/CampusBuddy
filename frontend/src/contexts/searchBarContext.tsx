import type { PropsWithChildren } from "react";
import { createContext, useCallback, useState } from "react";

type contextObject = {
  filterWord: string;
  setFilterWord: (arg: string) => void;
  clearSearchArea: () => void;
};
const SearchBarContext = createContext<contextObject | null>(null);

export const SearchBarContextProvider = ({ children }: PropsWithChildren) => {
  const [filterWord, updateFilterWord] = useState("");
  const setFilterWord = useCallback((arg: string) => {
    updateFilterWord(arg);
  }, []);
  const clearSearchArea = useCallback(() => {
    updateFilterWord("");
  }, []);

  return (
    <SearchBarContext.Provider
      value={{ filterWord, setFilterWord, clearSearchArea }}
    >
      {children}
    </SearchBarContext.Provider>
  );
};

export default SearchBarContext;
