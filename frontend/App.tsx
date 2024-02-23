import "react-native-gesture-handler";
import ContextFactory from "~/contexts";
import Navigation from "~/navigation";
import { LogBox } from 'react-native';

// For demo purposes ignore warning messages
LogBox.ignoreLogs(['']);

export default function App() {
    return (
        <ContextFactory>
            <Navigation />
        </ContextFactory>
    );
}