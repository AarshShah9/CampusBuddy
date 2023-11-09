import { createContext, useState, useCallback, useRef, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { ActivityIndicator, Modal, SafeAreaView, Animated } from 'react-native';

type appContext = { startLoading: () => void, stopLoading: () => void };
const AppContext = createContext<appContext | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const startLoading = useCallback(() => {
        setIsLoading(true);
    }, [])
    const stopLoading = useCallback(() => {
        setIsLoading(false);
    }, [])

    const opacityAnim = useRef(new Animated.Value(1)).current;
    const loadingOpacity = 0.8 // should brainstorm and decide on a value
    useEffect(() => {
        Animated.timing(
            opacityAnim, {
              toValue: isLoading ? loadingOpacity : 1,
              duration: 400,
              useNativeDriver: true,
            }
        ).start();
    }, [isLoading]);

    return (
        <AppContext.Provider value={{ startLoading, stopLoading }}>
            <Animated.View style={{ flex: 1, opacity: opacityAnim }}>
                {children}
            </Animated.View>
            <Modal transparent animationType="fade" visible={isLoading}>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator />
                </SafeAreaView>
            </Modal>
        </AppContext.Provider>
    )
}

export default AppContext;