import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import useAppContext from '../../hooks/useAppContext';

export default function Home() {
    const { inDarkMode } = useAppContext();

    const testCallback = async () =>{
        fetch('http://10.0.0.247:3000/Test') // 172.20.10.13
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const { navigate } = useNavigation<any>();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: inDarkMode ? 'white' : 'black' }}>Open up App.tsx to start working on your app!</Text>
            <Button title={"Test"} onPress={testCallback} />
            <View style={styles.mockEventsContainer}>
                <TouchableOpacity style={styles.mockEventContainer} onPress={() => {
                    navigate('EventDetails', { eventNumber: 1 })
                }}>
                    <Text>Mock Event 1</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.mockEventContainer} onPress={() => {
                    navigate('EventDetails', { eventNumber: 2 })
                }}>
                    <Text>Mock Event 2</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    mockEventsContainer: {
        marginTop: 30,
        display: 'flex',
        flexDirection: 'row',
        width: '95%',
        height: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    mockEventContainer: {
        display: 'flex',
        width: 100,
        height: 100,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: 'lightgrey',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 4,
    }
})