import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import type { PropsWithChildren } from "react";
import { createContext, useCallback, useRef } from "react";

type profileContext = {
    openModal: () => void,
    closeModal: () => void,
    bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>
};
const ProfileContext = createContext<profileContext | null>(null);

export const ProfileContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const openModal = useCallback(() => {
        if(bottomSheetModalRef.current)
            bottomSheetModalRef.current.present();
    }, []);
    const { dismiss } = useBottomSheetModal();
    const closeModal = useCallback(() => {
        dismiss()
    }, [dismiss])

    return (
        <ProfileContext.Provider value={{ openModal, closeModal, bottomSheetModalRef }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileContext;