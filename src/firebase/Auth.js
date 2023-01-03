import React, {createContext, useEffect, useState} from 'react';
import app from "./config";

export const AuthContext = createContext(undefined)
const AuthProvider = ({children}) => {
    const [currentUser,setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true);

    useEffect(() => {
        app.auth().onAuthStateChanged((user) => {
            setCurrentUser(user)
            setPending(false)
        });
    }, []);

    if(pending){
        return <>Loading...</>
    }

    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;