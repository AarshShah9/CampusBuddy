import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { PropsWithChildren, useEffect, useState } from "react";
import { createContext, useCallback, useRef } from "react";
import { CBRequest, uploadImageRequest } from "~/lib/CBRequest";
import useAuthContext from "~/hooks/useAuthContext";
import { imageGetter } from "~/lib/requestHelpers";
import useLoadingContext from "~/hooks/useLoadingContext";
import useProfileContext from "~/hooks/useProfileContext";

export type profileData = {
  attended: number;
  user: any; // TODO type this
  savedEvents: any; // TODO type this
};

type profileContext = {
  closeModal: () => void;

  openModal: () => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  openPictureModal: () => void;
  bottomSheetPictureModalRef: React.RefObject<BottomSheetModalMethods>;

  onUpload: () => void;
  onDelete: () => void;

  profileData?: profileData;
};
const ProfileContext = createContext<profileContext | null>(null);

export const ProfileContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { dismiss } = useBottomSheetModal();
  const { setUser } = useAuthContext();
  const { startLoading, stopLoading } = useLoadingContext();

  const [profileData, setProfileData] = useState<profileData>();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const openModal = useCallback(() => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current.present();
  }, []);

  const bottomSheetPictureModalRef = useRef<BottomSheetModal>(null);
  const openPictureModal = useCallback(() => {
    if (bottomSheetPictureModalRef.current)
      bottomSheetPictureModalRef.current.present();
  }, []);

  const closeModal = useCallback(() => {
    dismiss();
  }, [dismiss]);

  const onUpload = useCallback(async () => {
    try {
      const result = await imageGetter();
      if (result.canceled) {
        return;
      }
      const image = result.assets[0];
      closeModal();
      const res = await uploadImageRequest(
        "post",
        "/api/user/profilePicture",
        image,
        { body: { force: true } },
      );
      setUser((prev) => {
        if (!prev) {
          throw new Error("prev user is undefined");
        }
        return { ...prev, image: res.data.data.image };
      });
      closeModal();
    } catch (error) {
      console.log(error);
      alert("An error occurred while trying to delete the picture");
    }
    closeModal();
  }, []);

  const onDelete = useCallback(async () => {
    try {
      await CBRequest("POST", "/api/user/deleteProfilePicture");
      setUser((prev) => {
        if (!prev) {
          throw new Error("prev user is undefined");
        }
        return { ...prev, image: "" };
      });
      closeModal();
    } catch (error) {
      console.log(error);
      alert("An error occurred while trying to delete the picture");
    }
  }, []);

  const getProfileData = useCallback(async () => {
    try {
      startLoading();
      const res = await CBRequest("GET", "/api/user/profile");
      setProfileData(res.data);
      stopLoading();
    } catch (error) {
      console.log(error);
      stopLoading();
      alert("An error occurred while trying to get the profile data");
    }
  }, [startLoading, stopLoading]);

  useEffect(() => {
    getProfileData();
  }, [getProfileData]);

  return (
    <ProfileContext.Provider
      value={{
        openModal,
        closeModal,
        bottomSheetModalRef,
        bottomSheetPictureModalRef,
        openPictureModal,
        onUpload,
        onDelete,
        profileData,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
