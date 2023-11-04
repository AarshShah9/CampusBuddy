import { createContext, useState, useCallback, useRef, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { ActivityIndicator, Modal, SafeAreaView, Animated, useColorScheme } from 'react-native';

type appContext = { inDarkMode: boolean, startLoading: () => void, stopLoading: () => void };
const AppContext = createContext<appContext | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const inDarkMode = useColorScheme() === 'dark';

    const [isLoading, setIsLoading] = useState(false);
    const startLoading = useCallback(() => {
        setIsLoading(true);
    }, [setIsLoading])

    const stopLoading = useCallback(() => {
        setIsLoading(false);
    }, [setIsLoading])

    const opacityAnim = useRef(new Animated.Value(1)).current;
    const loadingOpacity = 0.35;
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
        <AppContext.Provider value={{ inDarkMode, startLoading, stopLoading }}>
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