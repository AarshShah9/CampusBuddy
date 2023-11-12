import {View} from 'react-native';
import {ThemedText} from '~/components/ThemedComponents';
import React from "react";

export default function Marketplace() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ThemedText>Marketplace</ThemedText>
        </View>
    );
}