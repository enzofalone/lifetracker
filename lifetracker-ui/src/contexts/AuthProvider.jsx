import * as React from 'react';

const AuthContext = React.createContext({});

export default function AuthProvider({ children }) {
    const [auth, setAuth] = React.useState({});
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}