import type { PropsWithChildren } from "react";
import { createContext, useCallback, useState } from "react";

type contextObject = {
  filterWord: string;
  setFilterWord: (arg: string) => void;
  clearSearchArea: () => void;
};
const ChatsSearchContext = createContext<contextObject | null>(null);

export const ChatsSearchContextProvider = ({ children }: PropsWithChildren) => {
  const [filterWord, updateFilterWord] = useState("");
  const setFilterWord = useCallback((arg: string) => {
    updateFilterWord(arg);
  }, []);
  const clearSearchArea = useCallback(() => {
    updateFilterWord("");
  }, []);

  return (
    <ChatsSearchContext.Provider
      value={{ filterWord, setFilterWord, clearSearchArea }}
    >
      {children}
    </ChatsSearchContext.Provider>
  );
};

export default ChatsSearchContext;
