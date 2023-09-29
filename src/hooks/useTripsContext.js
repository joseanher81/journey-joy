import { useContext } from "react";
import { TripsContext } from "../context/TripsContext";

export const useTripsContext = () => {
    const context = useContext(TripsContext);
    
    if(!context) throw new Error('useTripsContext must be inside an TripsContextProvider');

    return context;
}