import { createContext, useState } from 'react';
import type { PropsWithChildren } from 'react';

type authContext = { user: { name: string, email: string } | null };
const AuthContext = createContext<authContext | null>(null);

export const AuthContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;