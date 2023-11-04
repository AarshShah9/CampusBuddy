import 'react-native-gesture-handler';
import Navigation from './Navigation';
import { AppContextProvider } from './contexts/appContext';

export default function App() {
  return <AppContextProvider><Navigation /></AppContextProvider>
}
