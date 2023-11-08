import 'react-native-gesture-handler';
import { ThemeContextProvider } from './contexts/themeContext';
import { AppContextProvider } from './contexts/appContext';
import Navigation from './navigation/Navigation';


export default function App() {
    return (
        <ThemeContextProvider>
            <AppContextProvider>
                <Navigation />
            </AppContextProvider>
        </ThemeContextProvider>
    )
}
