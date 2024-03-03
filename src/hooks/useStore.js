import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { useState } from "react";


export const useStore = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const uploadFile = async(id, file) => {
        setError(null);
        setIsPending(true);

        try {
            // Upload user thumbnail
            const uploadPath = `documents/${id}/${file.name}`;  // Path in fb store to save
            const fileRef = ref(storage, uploadPath);
            const documentFile = await uploadBytes(fileRef, file);
            const downloadURL = await getDownloadURL(documentFile.ref);

            setError(null);
            setIsPending(false);

            return downloadURL;
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
        }

        return null;
    }

    return {error, isPending, uploadFile}
}