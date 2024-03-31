import { Text } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import PersonChip from "./PersonChip";
import CommentsChip from "./CommentsChip";
import { useCallback } from "react";
import useNavigationContext from "~/hooks/useNavigationContext";

type Props = {
  id: string;
  title: string;
  description: string;
  requiredMembers?: number;
};

export default function LookingForItem({
  id,
  title,
  description,
  requiredMembers,
}: Props) {
  const { navigateTo } = useNavigationContext();
  const openLookingForDetails = useCallback(() => {
    navigateTo({ page: "LookingForDetails", id });
  }, [id]);

  return (
    <TouchableOpacity onPress={openLookingForDetails}>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.bottomContainer}>
          <CommentsChip />
          {requiredMembers && <PersonChip numberOfUsers={requiredMembers} />}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    //height: 174,
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "rgb(204, 204, 204)",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 18,
    marginBottom: 8,
  },
  description: {
    fontFamily: "Roboto-Reg",
  },
  bottomContainer: {
    marginTop: 20,
    marginBottom: 15,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
