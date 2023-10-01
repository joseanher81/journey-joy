import { useState } from "react";
import { auth, storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { collection, doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signUp = async (email, password, displayName, thumbnail) => {
        setError(null);
        setIsPending(true);

        try {
            //Sign up user
            const {user} = await createUserWithEmailAndPassword(auth, email, password);

            if(!user) throw new Error('Could not complete signup');

             // Upload user thumbnail
             const uploadPath = `thumbnails/${user.uid}/${thumbnail.name}`;  // Path in fb store to save
             const imagesRef = ref(storage, uploadPath);
             const img = await uploadBytes(imagesRef, thumbnail);
             const downloadURL = await getDownloadURL(img.ref);

            // Update display name
            await updateProfile(user, {displayName, photoURL: downloadURL});

            // Create a user document in firebase (doc id is the same as user id)
            const docRef = doc(db, 'users', user.uid);
            await setDoc(docRef, {
                online: true,
                theme: "light",
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