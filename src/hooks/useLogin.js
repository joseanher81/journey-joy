import { useState } from "react";
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth"
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

    return {error, isPending, login}
}