import {
    attendEvent,
    deleteEvent,
    flipPublic,
    getEventDetails,
    likeEvent,
  } from "~/lib/apiFunctions/Events";
  import { EventDetailsType } from "~/screens/EventDetails";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { Alert } from "react-native";

export default function useEventDetails(id: string) {
    const {
        data: eventData,
        refetch: refetchEventDetails,
        isLoading,
    } = useQuery<EventDetailsType>({
        queryKey: ["event-details", id],
        queryFn: () => getEventDetails(id)
    });

    const likeMutation = useMutation({
        mutationFn: async (id: string) => likeEvent(id),
        onSuccess: () => {
          refetchEventDetails();
          closeModal();
        },
        onError: () => {
          Alert.alert("Error", "An error occurred while updating the event");
        },
      });
    
      const likeMutate = useCallback(() => {
        likeMutation.mutate(id);
      }, [id, likeMutation]);

      const deleteMutation = useMutation({
        mutationFn: async (id: string) => deleteEvent(id),
        onSuccess: () => {
          Alert.alert("Event Deleted", "The event has been deleted successfully");
          refetchEventDetails();
          closeModal();
        },
        onError: () => {
          Alert.alert("Error", "An error occurred while deleting the event");
        },
      });

      const deleteMutate = useCallback(() => {
        deleteMutation.mutate(id);
      }, [id, deleteMutation]);


      const flipPublicMutation = useMutation({
        mutationFn: async (id: string) => flipPublic(id),
        onSuccess: () => {
          Alert.alert(
            "Public Status Updated",
            "The public status has been updated",
          );
          refetchEventDetails();
          closeModal();
        },
        onError: () => {
          Alert.alert("Error", "An error occurred while updating public status");
        },
      });
    
      const flipPublicMutate = useCallback(() => {
        flipPublicMutation.mutate(id);
      }, [id, flipPublicMutation]);
      
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    
    const openModal = useCallback(() => {
        if (bottomSheetModalRef.current) bottomSheetModalRef.current.present();
      }, []);

    const { dismiss } = useBottomSheetModal();
    
    const closeModal = useCallback(() => {
        dismiss();
    }, [dismiss]);
      
    return ({
        eventData,
        refetchEventDetails,
        isLoading,
        openModal,
        bottomSheetModalRef,
        closeModal,
        likeMutate,
        deleteMutate,
        flipPublicMutate
    })
}