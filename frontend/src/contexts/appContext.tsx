import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

type appContext = { user: { name: string, email: string } | null };
const AppContext = createContext<appContext | null>(null);

export const AppContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [user, setUser] = useState(null);

    return (
        <AppContext.Provider value={{ user }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext;