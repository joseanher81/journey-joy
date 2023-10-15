import { useState } from "react";
import { auth, db, googleAuthProvider } from "../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useAuthContext } from "./useAuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { useFirestore } from "./useFirestore";

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const { getDocument } = useFirestore('users');

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            // Login user
            const { user } = await signInWithEmailAndPassword(auth, email, password);

            if( !user ) throw new Error('Could not complete login');

            // Load user custom properties
            const custom = await getDocument(user.uid);
            const completeUser = {...user, ...custom}

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: completeUser });

            setError(null);
            setIsPending(false);
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
        }
    }

    const loginWithGoogle = async () => {
        try {
            // Init session with Google
            const result = await signInWithPopup(auth, googleAuthProvider);
        
            // User loged in
            const user = result.user;
            console.log(`Usuario autenticado: ${user.displayName}`);

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: user });
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
        }
    }

    return {error, isPending, login, loginWithGoogle}
}