import { StyleSheet, Text, View, Button, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { ThemedText } from '../components/ThemedComponents';
import { Card } from 'react-native-paper';
import useAppContext from '../hooks/useAppContext';

export default function Home() {
    const { startLoading, stopLoading } = useAppContext();

    const testCallback = async () =>{
        startLoading();
        setTimeout(() => {
            fetch('http://10.0.0.247:3000/Test') // 172.20.10.13
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    stopLoading()
                });
        }, 3000)
    }

    const { navigate } = useNavigation<any>();

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Open up App.tsx to start working on your app!</ThemedText>
            <Button title={"Test"} onPress={testCallback} />
            <View style={styles.mockEventsContainer}>
                <Card style={styles.mockEventContainer}
                    mode='elevated' 
                    onPress={() => {
                        navigate('EventDetails', { eventNumber: 1 })
                    }}
                >
                    <Card.Content style={{ alignItems: 'center' }}>
                        <ThemedText>Mock Event 1</ThemedText>
                    </Card.Content>
                </Card>
                <Card style={styles.mockEventContainer}
                    mode='elevated' 
                    onPress={() => {
                        navigate('EventDetails', { eventNumber: 2 })
                    }}
                >
                    <Card.Content style={{ alignItems: 'center' }}>
                        <ThemedText>Mock Event 2</ThemedText>
                    </Card.Content>
                </Card>
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
        width: 100,
        height: 100,
        justifyContent: 'center'
    }
})