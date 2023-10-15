import { StatusBar } from 'expo-status-bar';
import {Button, StyleSheet, Text, View} from 'react-native';


import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function HomeScreen() {
    const testCallback = async () =>{
        fetch('http://192.168.0.240:3000/Test')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Open up App.tsx to start working on your app!</Text>
                <Button title={"Test"} onPress={testCallback} />
                <StatusBar style="auto" />
            </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function App() {



  return (
      <NavigationContainer>
          <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} />
              <Tab.Screen name="Settings" component={SettingsScreen} />
          </Tab.Navigator>
      </NavigationContainer>
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
