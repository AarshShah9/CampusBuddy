import {
  createContext,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteEvent,
  flipPublic,
  getEventDetails,
  likeEvent,
} from "~/lib/apiFunctions/Events";
import { EventDetailsType } from "~/screens/EventDetails";
import { Alert } from "react-native";

type eventsContext = {
  closeModal: () => void;

  openModal: () => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;

  openItemModal: (id: string) => void;
  bottomSheetItemModalRef: React.RefObject<BottomSheetModalMethods>;

  eventData?: EventDetailsType;
  fetchEventDetails: (id: string) => void;
  refetchEventDetails: () => void;
  likeMutate: () => void;
  deleteMutate: () => void;
  flipPublicMutate: () => void;

  itemId?: string;
};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { dismiss } = useBottomSheetModal();

  const [currentEventId, setCurrentEventId] = useState<string | undefined>(
    undefined,
  );

  const [currentItemId, setCurrentItemId] = useState<string | undefined>(
    undefined,
  );

  const { data: eventData, refetch: refetchEventDetails } =
    useQuery<EventDetailsType>({
      queryKey: ["event-details", currentEventId],
      queryFn: () => getEventDetails(currentEventId!),
      enabled: !!currentEventId,
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
    likeMutation.mutate(currentEventId!);
  }, [currentEventId, likeMutation]);

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
    deleteMutation.mutate(currentEventId!);
  }, [currentEventId, deleteMutation]);

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
    flipPublicMutation.mutate(currentEventId!);
  }, [currentEventId, flipPublicMutation]);

  const fetchEventDetails = useCallback((id: string) => {
    setCurrentEventId(id);
  }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = useCallback(() => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current.present();
  }, []);

  const bottomSheetItemModalRef = useRef<BottomSheetModal>(null);

  const openItemModal = useCallback((id: string) => {
    if (bottomSheetItemModalRef.current)
      bottomSheetItemModalRef.current.present();
    setCurrentItemId(id);
  }, []);

  const closeModal = useCallback(() => {
    setCurrentEventId(undefined);
    setCurrentItemId(undefined);
    dismiss();
  }, [dismiss]);

  return (
    <EventsContext.Provider
      value={{
        closeModal,
        openModal,
        bottomSheetModalRef,
        eventData,
        fetchEventDetails,
        refetchEventDetails,
        likeMutate,
        deleteMutate,
        flipPublicMutate,
        openItemModal,
        bottomSheetItemModalRef,
        itemId: currentItemId,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
