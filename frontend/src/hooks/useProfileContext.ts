import { useContext } from "react";
import ProfileContext from "~/contexts/profileContext";

export default function useProfileContext() {
  const contextValues = useContext(ProfileContext);

  if (!contextValues)
    throw new Error(
      "useProfileContext must be used within a ProfileContextProvider",
    );

  return contextValues;
}
