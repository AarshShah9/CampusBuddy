import {ActivityIndicator, Modal, View} from 'react-native';

type Props = {
    isLoading: boolean
}
export default function LoadingDisplay({ isLoading }: Props) {
    return (
        <Modal transparent animationType="fade" visible={isLoading}>
            <View 
                style={{ 
                    flex: 1, justifyContent: 'center', 
                    alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' 
                }}
            >
                <ActivityIndicator />
            </View>
        </Modal>
    )
}