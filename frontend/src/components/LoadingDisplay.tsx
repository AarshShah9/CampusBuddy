import {ActivityIndicator, Modal, SafeAreaView} from 'react-native';
import React from "react";

type Props = {
    isLoading: boolean
}
export default function LoadingDisplay({ isLoading }: Props) {
    return (
        <Modal transparent animationType="fade" visible={isLoading}>
            <SafeAreaView 
                style={{ 
                    flex: 1, justifyContent: 'center', 
                    alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' 
                }}
            >
                <ActivityIndicator />
            </SafeAreaView>
        </Modal>
    )
}