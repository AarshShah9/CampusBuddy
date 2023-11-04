import { View, Text } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import useAppContext from '../../hooks/useAppContext';

export default function EventDetails() {
    const { inDarkMode } = useAppContext();
    
    const { setOptions: setNavigationOptions } = useNavigation();
    const { params: { eventNumber } } = useRoute<any>();

    useLayoutEffect(() => {
        setNavigationOptions({
            headerTitle: `Mock Event ${eventNumber}`
        })
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: inDarkMode ? 'white' : 'black' }}>{`Mock Event ${eventNumber}`}</Text>
        </View>
    )
}