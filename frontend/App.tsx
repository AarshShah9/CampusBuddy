import 'react-native-gesture-handler';
import { ThemeContextProvider } from './contexts/themeContext';
import { AppContextProvider } from './contexts/appContext';
import Navigation from './Navigation';


export default function App() {
    return (
        <ThemeContextProvider>
            <AppContextProvider>
                <Navigation />
            </AppContextProvider>
        </ThemeContextProvider>
    )
}
