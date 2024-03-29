import UserProfileHeader from "~/components/UserProfileHeader";
import { View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "~/lib/apiFunctions/Profile";
import { generateImageURL } from "~/lib/CDNFunctions";

export default function ProfilePage() {
  const {
    params: { id },
  } = useRoute<any>();

  console.log("ID", id);

  const { data: profileData } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => getUserProfile(id),
    initialData: undefined,
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <UserProfileHeader
        name={profileData?.user.name}
        attended={0}
        following={0}
        imageSource={{ uri: generateImageURL(profileData?.user.image)! }}
        programs={profileData?.user.programs}
      />
    </View>
  );
}
