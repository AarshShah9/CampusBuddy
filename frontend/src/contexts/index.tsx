import { PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContextProvider } from "./themeContext";
import { AppContextProvider } from "./appContext";
import { AuthContextProvider } from "./authContext";
import { LoadingContextProvider } from "./loadingContext";
import { EventsContextProvider } from "./eventsContext";

export default function ContextFactory({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <AppContextProvider>
                    <AuthContextProvider>
                        <LoadingContextProvider>
                            <EventsContextProvider>
                                {children}
                            </EventsContextProvider>
                        </LoadingContextProvider>
                    </AuthContextProvider>
                </AppContextProvider>
            </ThemeContextProvider>
        </QueryClientProvider>
    );
}