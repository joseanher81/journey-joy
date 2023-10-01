import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

import { onAuthStateChanged } from "firebase/auth";
import { useFirestore } from "../hooks/useFirestore";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, user: action.payload };
        case 'LOGOUT':
            return { ...state, user: null };
        case 'AUTH_IS_READY':
            return { ...state, isAuthReady: true, user: action.payload };            
        default:
            return state;
    }
} 
 
export const AuthContextProvider = ({children}) => {
    const { getDocument } = useFirestore('users');
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthReady: false
    });

    useEffect(() => {
        const unsub = onAuthStateChanged( auth, (user) => {
            (async () => {
                    try {
                        // Load user custom properties
                        if(user) {
                            const custom = await getDocument(user.uid);
                            user = {...user, ...custom}
                        }

                        dispatch({ type: 'AUTH_IS_READY', payload: user});
                    } catch (error) {
                      console.error("Error loading user custom data:", error);
                    }
              })();
            
            unsub();
        });
    }, [])

    console.log('Auth context state', state)

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
