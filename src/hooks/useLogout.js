import { useState } from "react";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth"
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            // Logout user
            await signOut(auth);

            // Dispatch logout action
            dispatch({ type: 'LOGOUT' });

            setError(null);
            setIsPending(false);
            
        } catch (error) {
            console.log(error.message);
            setError(error.message);
            setIsPending(false);
        }
    }

    return {error, isPending, logout}
}