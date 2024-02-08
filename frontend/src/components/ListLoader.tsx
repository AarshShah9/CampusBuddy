import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function ListLoader({ isLoading }: { isLoading: boolean }) {
  return (
    <View style={styles.container}>
      {isLoading && (
        <View style={styles.loadingWrapper}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    marginTop: 8,
  },
  loadingWrapper: {
    flex: 1,
  },
});
