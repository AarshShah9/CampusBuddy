import "react-native-gesture-handler";
import ContextFactory from "~/contexts";
import Navigation from "~/navigation";

export default function App() {
    return (
        <ContextFactory>
            <Navigation />
        </ContextFactory>
    );
}