import 'react-native-gesture-handler';
import { ThemeContextProvider } from './src/contexts/themeContext';
import { AppContextProvider } from './src/contexts/appContext';
import { LoadingContextProvider } from './src/contexts/loadingContext';
import Navigation from './src/navigation/Navigation';

export default function App() {
    return (
        <ThemeContextProvider>
            <AppContextProvider>
                <LoadingContextProvider>
                    <Navigation />
                </LoadingContextProvider>
            </AppContextProvider>
        </ThemeContextProvider>
    )
}
