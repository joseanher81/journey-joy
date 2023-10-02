import { createContext, useReducer } from "react";


export const SnackBarContext = createContext();

const snackBarReducer = (state, action)  => {
    switch (action.type) {
        case 'SHOW_SNACK':
            return { ...state, visible: true, message: action.payload}
        case 'HIDE_SNACK':
            return { ...state, visible: false, message: ''}
        default:
            return state;
    }
}

export const SnackBarContextProvider = ({children}) => {

     // Initial context state  
    const [state, dispatch] = useReducer(snackBarReducer, {
        visible: false,
        message: ''
    });

    const hideSnack = () => {
        dispatch({type: 'HIDE_SNACK'});
    }

    const showSnack = (message) => {
        dispatch({type: 'SHOW_SNACK', payload: message});
    }
    
 
    return (
        <SnackBarContext.Provider value={{...state, hideSnack, showSnack}}>
            {children}
        </SnackBarContext.Provider>
    );
}