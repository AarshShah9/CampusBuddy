import { BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useRef } from 'react'
import { Alert } from 'react-native';
import useAuthContext from '~/hooks/useAuthContext';
import useNavigationContext from '~/hooks/useNavigationContext';
import { getMarketPlaceItem } from '~/lib/apiFunctions/Items';
import { deleteItem } from '~/lib/apiFunctions/Profile';
import { MarketPlaceItemResponse } from '~/types/MarketPlaceItem';

export function useMarketplaceItemDetails(id: string) {
    const { data: marketplaceData } = useQuery<MarketPlaceItemResponse>({
        queryKey: ["marketplace-detail", id],
        queryFn: () => getMarketPlaceItem(id),
    });

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openModal = useCallback(() => {
        if (bottomSheetModalRef.current)
            bottomSheetModalRef.current.present();
    }, []);

    const { dismiss } = useBottomSheetModal();

    const closeModal = useCallback(() => {
        dismiss();
    }, [dismiss]);

    const { navigateBack } = useNavigationContext();

    const queryClient = useQueryClient();

    const { user } = useAuthContext();

    const { mutate } = useMutation({
        mutationFn: () => deleteItem(id),
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

    return ({
        bottomSheetModalRef,
        marketplaceData,
        openModal, deleteHandler: mutate
    })
}