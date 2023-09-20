import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';

export default function App() {

  const testCallback = async () =>{
      console.log("Test")
    fetch('http://192.168.0.194/Test')
        .then(response => console.log(response)).catch(error => console.log(error))
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title={"Test"} onPress={testCallback} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
