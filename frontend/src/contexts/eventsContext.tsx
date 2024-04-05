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
import { getEventDetails, likeEvent } from "~/lib/apiFunctions/Events";
import { EventDetailsType } from "~/screens/EventDetails";

type eventsContext = {
  closeModal: () => void;

  openModal: (eventId: string) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  eventData?: EventDetailsType;
  fetchEventDetails: (id: string) => void;
  refetchEventDetails: () => void;
  likeMutate: () => void;
};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { dismiss } = useBottomSheetModal();

  const [currentEventId, setCurrentEventId] = useState<string | undefined>(
    undefined,
  );

  const { data: eventData, refetch: refetchEventDetails } =
    useQuery<EventDetailsType>({
      queryKey: ["event-details", currentEventId],
      queryFn: () => getEventDetails(currentEventId!),
      enabled: !!currentEventId,
    });

  const likeMutation = useMutation({
    mutationFn: async (id: string) => {
      await likeEvent(id);
      await refetchEventDetails();
    },
  });

  const likeMutate = useCallback(() => {
    likeMutation.mutate(currentEventId!);
    closeModal();
  }, [currentEventId, likeMutation]);

  const fetchEventDetails = useCallback((id: string) => {
    setCurrentEventId(id);
  }, []);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = useCallback(() => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current.present();
  }, []);

  const closeModal = useCallback(() => {
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
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
