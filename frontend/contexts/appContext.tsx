import { createContext, useState, useCallback, useRef, useEffect } from 'react';
import type { PropsWithChildren } from 'react';
import { ActivityIndicator, Modal, Text, SafeAreaView, Animated, useColorScheme } from 'react-native';

type appContext = { inDarkMode: boolean, setIsLoading: (arg: boolean) => void };
const AppContext = createContext<appContext | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const inDarkMode = useColorScheme() === 'dark';

    const [isLoading, setIsLoading] = useState(false);
    const updateLoading = useCallback((arg: boolean) => {
        setIsLoading(arg);
    }, [setIsLoading])

    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(
            opacityAnim, {
              toValue: isLoading ? 0.5: 1,
              duration: 400,
              useNativeDriver: true,
            }
        ).start();
    }, [isLoading]);

    return (
        <AppContext.Provider value={{ inDarkMode, setIsLoading: updateLoading }}>
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