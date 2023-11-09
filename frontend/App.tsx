import 'react-native-gesture-handler';
import { ThemeContextProvider } from './src/contexts/themeContext';
import { AppContextProvider } from './src/contexts/appContext';
import Navigation from './src/navigation/Navigation';


export default function App() {
    return (
        <ThemeContextProvider>
            <AppContextProvider>
                <Navigation />
            </AppContextProvider>
        </ThemeContextProvider>
    )
}
