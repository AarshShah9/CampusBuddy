import { useContext } from "react";
import LookingForContext from "~/contexts/lookingForContext";

export default function useAppContext() {
    const contextValues = useContext(LookingForContext);

    if (!contextValues)
        throw new Error("useLookingForContext must be used within a LookingForContextProvider");

    return contextValues;
}