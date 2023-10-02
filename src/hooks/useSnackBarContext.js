import { useContext } from "react";
import { SnackBarContext  } from "../context/SnackBarContext";

export const useSnackBarContext = () => {
    const context = useContext(SnackBarContext);
    
    if(!context) throw new Error('useSnackBarContext must be inside an SnackBarContextProvider');

    return context;
}