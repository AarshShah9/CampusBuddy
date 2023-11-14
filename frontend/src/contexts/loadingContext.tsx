import type {PropsWithChildren} from 'react';
import {createContext, useCallback, useState} from 'react';
import LoadingDisplay from '~/components/LoadingDisplay';

type loadingContext = { isLoading: boolean, startLoading: () => void, stopLoading: () => void };
const LoadingContext = createContext<loadingContext | null>(null);

export const LoadingContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [isLoading, setIsLoading] = useState(false);
    const startLoading = useCallback(() => {
        setIsLoading(true);
    }, [])
    const stopLoading = useCallback(() => {
        setIsLoading(false);
    }, [])

    return (
        <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading }}>
            {children}
            <LoadingDisplay isLoading={isLoading} />
        </LoadingContext.Provider>
    )
}

export default LoadingContext;