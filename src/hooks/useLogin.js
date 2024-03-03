import { useState } from "react";
import { auth, db, googleAuthProvider } from "../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useAuthContext } from "./useAuthContext";
import { doc, setDoc } from "firebase/firestore";
import { useFirestore } from "./useFirestore";

export const useLogin = () => {
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const { getDocument } = useFirestore('users');

    const login = async (email, password) => {
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
            setIsPending(false);

            return {status: 'ok'}

        } catch (error) {
            console.log(error.message);
            setIsPending(false);

            return {status: 'error', message: error.message}  
        }
    }

    const loginWithGoogle = async () => {
        try {
            // Init session with Google
            const result = await signInWithPopup(auth, googleAuthProvider);
        
            // User loged in
            const user = result.user;

            // Create a user document in firebase (doc id is the same as user id)
            const docRef = doc(db, 'users', user.uid);
            await setDoc(docRef, {
                online: true,
                theme: "light",
                displayName: user.displayName,
                photoURL: user.photoURL
            });

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: user });

            return {status: 'ok'}

        } catch (error) {
            console.log(error.message);
            setIsPending(false);

            return {status: 'error', message: error.message}  
        }
    }

    return {isPending, login, loginWithGoogle}
}