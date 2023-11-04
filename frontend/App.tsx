import 'react-native-gesture-handler';
import { AppContextProvider } from './contexts/appContext';
import Navigation from './Navigation';


export default function App() {
  return <AppContextProvider><Navigation /></AppContextProvider>
}
