import {
  createContext,
  PropsWithChildren,
  useCallback,
  useRef,
  useState,
} from "react";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";

type eventsContext = {
  closeModal: () => void;

  openModal: (eventId: string) => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
};
const EventsContext = createContext<eventsContext | null>(null);

export const EventsContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { dismiss } = useBottomSheetModal();

  const [currentEventId, setCurrentEventId] = useState<string>();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = useCallback((eventId: string) => {
    setCurrentEventId(eventId);
    if (bottomSheetModalRef.current) bottomSheetModalRef.current.present();
  }, []);

  const closeModal = useCallback(() => {
    setCurrentEventId(undefined);
    dismiss();
  }, [dismiss]);

  return (
    <EventsContext.Provider
      value={{
        closeModal,
        openModal,
        bottomSheetModalRef,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};

export default EventsContext;
