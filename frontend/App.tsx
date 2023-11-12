import 'react-native-gesture-handler';
import { ThemeContextProvider } from './src/contexts/themeContext';
import { AuthContextProvider } from './src/contexts/authContext';
import { LoadingContextProvider } from './src/contexts/loadingContext';
import Navigation from './src/navigation/Navigation';

export default function App() {
    return (
        <ThemeContextProvider>
            <AuthContextProvider>
                <LoadingContextProvider>
                    <Navigation />
                </LoadingContextProvider>
            </AuthContextProvider>
        </ThemeContextProvider>
    )
}
