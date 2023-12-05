import type { PropsWithChildren } from 'react';
import { createContext } from 'react';

type chatScreenParams = { userId: string, userName: string };
type contextObject = {
    chatActive: chatScreenParams | null,
    activateScreen: (arg: chatScreenParams) => void,
    deactivateScreen: () => void
};
export const MessagesNavigationContext = createContext<contextObject | null>(null);

type Props = PropsWithChildren<{
    values: contextObject
}>;
export const MessagesNavigationContextProvider = ({ children, values }: Props): JSX.Element => {
    return (
        <MessagesNavigationContext.Provider value={values}>
            {children}
        </MessagesNavigationContext.Provider>
    )
}

export default MessagesNavigationContext;