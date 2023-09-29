import { createContext, useEffect, useReducer } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCollection } from "../hooks/useCollection";

export const TripsContext = createContext();

const tripsReducer = (state, action)  => {
    switch (action.type) {
        case 'UPDATE_TRIPS':
            return { ...state, tripsList: action.payload}
        default:
            return state;
    }
}

export const TripsContextProvider = ({children}) => {

     // Initial context state  
    const [state, dispatch] = useReducer(tripsReducer, {
        tripsList: null,
        currentTrip: null,
        visitedCountries: []
    });

    const { user } = useAuthContext();
    
    // Load user trips if user exist
    const queryConfig = [
        {field: 'createdBy', operator: '==', value: user.uid},
        {field: 'companions', operator: 'array-contains', value: user.uid}
    ];

    const {documents, error} = useCollection('trips', queryConfig, 'startDate');
    
    useEffect(() => {
        if(documents) dispatch({type: 'UPDATE_TRIPS', payload: documents});
    }, [documents])
    
 
    return (
        <TripsContext.Provider value={{...state}}>
            {children}
        </TripsContext.Provider>
    );
}