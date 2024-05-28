import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PropsWithChildren, createContext, useCallback, useRef, useState } from 'react'
import { Alert } from 'react-native';
import useAuthContext from '~/hooks/useAuthContext';
import useNavigationContext from '~/hooks/useNavigationContext';
import { deleteItem } from '~/lib/apiFunctions/Profile';

type contextobject = {
    bottomSheetItemModalRef: React.RefObject<BottomSheetModalMethods>,
    item: any
}

type modalData = {
    self: boolean;
    id: string;
};

const LookingForContext = createContext<contextobject | null>(null);

type Props = PropsWithChildren<{
    itemId: string
}>;
export function LookingForContextProvider({ children, itemId }: Props) {
    const { dismiss } = useBottomSheetModal();

    const [item, setCurrentItem] = useState<modalData>();

    const bottomSheetItemModalRef = useRef<BottomSheetModal>(null);

    const openItemModal = useCallback((id: string, self: boolean) => {
        if (bottomSheetItemModalRef.current)
            bottomSheetItemModalRef.current.present();
        setCurrentItem({
            id,
            self,
        });
    }, []);

    const closeModal = useCallback(() => {
        dismiss();
    }, [dismiss]);

    const { navigateBack } = useNavigationContext();

    const queryClient = useQueryClient();

    const { user } = useAuthContext();

    const deleteMutation = useMutation({
        mutationFn: () => deleteItem(item?.id!),
        onSuccess: () => {
            closeModal();
            navigateBack();
            Alert.alert("Success", "Item deleted successfully.");
            queryClient.invalidateQueries({
                queryKey: ["search-marketplace-items"],
            });
            queryClient.invalidateQueries({
                queryKey: ["user-market", user?.id],
            });
        },
        onError: (err) => {
            Alert.alert("Error", err.message);
        },
    });

    return (
        <LookingForContext.Provider value={{}}>
            {children}
        </LookingForContext.Provider>
    )
}

export default LookingForContext;