import { useCallback, useRef } from "react";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  attendPost,
  deletePost,
  getLookingForById,
} from "~/lib/apiFunctions/LookingFor";
import { Alert } from "react-native";
import useNavigationContext from "./useNavigationContext";
import useAuthContext from "./useAuthContext";

type LookingForDetailsType = {
  id: string;
  title: string;
  description: string;
  spotsLeft: number;
  createdAt: string;
  userId: string;
  userName: string;
  userImage: string;
  isFlagged: boolean;
  self: boolean;
  isAttending: boolean;
};

export default function usePostDetails(id: string) {
  const { data: lookingForData, refetch } = useQuery<LookingForDetailsType>({
    queryKey: ["lookingFor-details", id],
    queryFn: async () => getLookingForById(id),
  });

  const joinPostMutation = useMutation({
    mutationFn: () => attendPost(id),
    onSuccess: () => {
      Alert.alert("Success", "Updated Successfully!");
      refetch();
    },
    onError: (error) => {
      Alert.alert("Error", error.message);
    },
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openModal = useCallback(() => {
    if (bottomSheetModalRef.current) bottomSheetModalRef.current.present();
  }, []);

  const { dismiss } = useBottomSheetModal();

  const closeModal = useCallback(() => {
    dismiss();
  }, [dismiss]);

  const { navigateBack } = useNavigationContext();

  const queryClient = useQueryClient();

  const { user } = useAuthContext();

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(id),
    onSuccess: () => {
      closeModal();
      navigateBack();
      Alert.alert("Success", "Post deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: ["search-page-posts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-posts", user?.id],
      });
    },
    onError: (err) => {
      Alert.alert("Error", err.message);
    },
  });

  return {
    lookingForData,
    bottomSheetModalRef,
    openModal,
    joinPostMutation: joinPostMutation.mutate,
    deleteHandler: deleteMutation.mutate,
  };
}
