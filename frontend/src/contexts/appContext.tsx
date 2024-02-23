import type { PropsWithChildren } from "react";
import { createContext, useCallback } from "react";
import { Keyboard } from "react-native";

type appContext = {
  dismissKeyboard: () => void
};
const AppContext = createContext<appContext | null>(null);

export const AppContextProvider = ({
    children,
}: PropsWithChildren): JSX.Element => {
    const dismissKeyboard = useCallback(() => { 
      Keyboard.dismiss()
    } , [])

  return (
        <AppContext.Provider value={{ dismissKeyboard }}>
        {children}
        </AppContext.Provider>
    );
};

export default AppContext;
