import { useState } from "react";
import { auth, storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { collection, doc, setDoc } from "firebase/firestore";

export const useSignuo = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signUp = async (email, password, displayName) => {
        setError(null);
        setIsPending(true);

        try {
            //Sign up user
            const {user} = await createUserWithEmailAndPassword(auth, email, password);

            if(!user) throw new Error('Could not complete signup');

            // Update display name
            await updateProfile(user, {displayName});

            // Create a user document in firebase (doc id is the same as user id)
            const docRef = doc(db, 'users', user.uid);
            await setDoc(docRef, {
                online: true,
                displayName
            });

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: user });

            setError(null);
            setIsPending(false);

        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
        }
    }

    return {error, isPending, signUp}
}