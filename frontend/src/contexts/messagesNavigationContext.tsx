import type { PropsWithChildren } from 'react';
import { createContext } from 'react';
import { ChatScreenParams } from '~/types/Chat';

type contextObject = {
    chatActive: ChatScreenParams | null,
    activateScreen: (arg: ChatScreenParams) => void,
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