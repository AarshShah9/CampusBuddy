import { Text } from "react-native-paper";
import { Feather } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";

type PersonChipProps = {
  numberOfUsers: number;
};

export default function PersonChip({ numberOfUsers }: PersonChipProps) {
  if (numberOfUsers === 0) return null;

  const backgroundColor =
    numberOfUsers < 2 ? "rgb(224,167,140)" : "rgb(141,187,162)";

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={styles.innerContainer}>
        <Feather name="user" size={16} color="black" lineThickness={5} />
        <Text style={styles.text}>
          {`${numberOfUsers} spot${numberOfUsers === 1 ? "" : "s"} left`}
        </Text>
      </View>
    </View>
  );
}

// prettier-ignore
const styles = StyleSheet.create({
    container: {
        borderRadius: 29,
        paddingVertical: 3,
        paddingHorizontal: 9,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start'
    },
    innerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: 14,
        marginLeft: 4
    }
})
