import { PropsWithChildren } from "react";
import { ThemeContextProvider } from "./themeContext";
import { AppContextProvider } from "./appContext";
import { AuthContextProvider } from "./authContext";
import { LoadingContextProvider } from "./loadingContext";

export default function ContextFactory({ children }: PropsWithChildren) {
  return (
    <ThemeContextProvider>
      <AppContextProvider>
        <AuthContextProvider>
          <LoadingContextProvider>{children}</LoadingContextProvider>
        </AuthContextProvider>
      </AppContextProvider>
    </ThemeContextProvider>
  );
}
