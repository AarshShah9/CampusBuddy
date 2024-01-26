import 'react-native-gesture-handler';
import { useState } from 'react';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ThemeContextProvider } from './src/contexts/themeContext';
import { AuthContextProvider } from './src/contexts/authContext';
import { LoadingContextProvider } from './src/contexts/loadingContext';
import Navigation from './src/navigation';

export default function App() {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeContextProvider>
                <AuthContextProvider>
                    <LoadingContextProvider>
                        <Navigation />
                    </LoadingContextProvider>
                </AuthContextProvider>
            </ThemeContextProvider>
        </QueryClientProvider>
    )
}
