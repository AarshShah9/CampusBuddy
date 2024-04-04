import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { createContext, PropsWithChildren, useCallback, useRef } from "react";
import { CBRequest, uploadImageRequest } from "~/lib/CBRequest";
import useAuthContext from "~/hooks/useAuthContext";
import { imageGetter } from "~/lib/requestHelpers";

type profileContext = {
  closeModal: () => void;

  openModal: () => void;
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  openPictureModal: () => void;
  bottomSheetPictureModalRef: React.RefObject<BottomSheetModalMethods>;

  onUpload: () => void;
  onDelete: () => void;
};
const ProfileContext = createContext<profileContext | null>(null);

export const ProfileContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const { dismiss } = useBottomSheetModal();
  const { setUser, setOrganization, userType, organization } = useAuthContext();

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

  const onUploadUser = useCallback(async () => {
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
    } catch (error) {
      console.log(error);
      alert("An error occurred while trying to upload the picture");
    }
  }, []);

  const onUploadOrganization = useCallback(async () => {
    try {
      const result = await imageGetter();
      if (result.canceled) {
        return;
      }
      const image = result.assets[0];
      closeModal();
      const res = await uploadImageRequest(
        "post",
        "/api/orgs/profilePicture/:id",
        image,
        {
          body: { force: true },
          params: { id: organization?.organizationId?.[0]! },
        },
      );
      setOrganization((prev) => {
        if (!prev) {
          throw new Error("prev organization is undefined");
        }
        return { ...prev, organizationImage: [res.data.data.image] };
      });
    } catch (error) {
      console.log(error);
      alert("An error occurred while trying to upload the picture");
    }
    closeModal();
  }, []);

  const onUpload = useCallback(async () => {
    if (userType === "Student") {
      await onUploadUser();
    } else if (userType === "Organization_Admin") {
      await onUploadOrganization();
    }
  }, [setOrganization, setUser, userType]);

  const onDeleteUser = useCallback(async () => {
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

  const onDeleteOrganization = useCallback(async () => {
    try {
      await CBRequest("POST", "/api/orgs/deleteProfilePicture/:id", {
        params: { id: organization?.organizationId?.[0]! },
      });
      setOrganization((prev) => {
        if (!prev) {
          throw new Error("prev organization is undefined");
        }
        return { ...prev, organizationImage: [] };
      });
      closeModal();
    } catch (error) {
      console.log(error);
      alert("An error occurred while trying to delete the picture");
    }
  }, []);

  const onDelete = useCallback(async () => {
    if (userType === "Student") {
      await onDeleteUser();
    } else if (userType === "Organization_Admin") {
      await onDeleteOrganization();
    }
  }, [setOrganization, setUser, userType]);

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
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;
