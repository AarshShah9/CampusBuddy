import Header from "./Header";
import Home from "~/screens/Home";
import ReusableStackScreens from "~/components/ReusableStackScreens";
import { useLayoutEffect } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";

export default function HomeGroup() {
    const { updateCurrentMaintab } = useNavigationContext();

    useLayoutEffect(() => updateCurrentMaintab("Home"), [])
    
    return (
        <ReusableStackScreens 
            name="Home" component={Home} 
            options={{ header: Header }}
        />
    );
}