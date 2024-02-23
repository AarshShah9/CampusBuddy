import "react-native-gesture-handler";
import ContextFactory from "~/contexts";
import Navigation from "~/navigation";
import { LogBox } from 'react-native';

// For demo purposes ignore this message
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered.']);

export default function App() {
    return (
        <ContextFactory>
            <Navigation />
        </ContextFactory>
    );
}