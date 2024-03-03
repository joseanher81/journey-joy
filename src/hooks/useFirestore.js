import { useEffect, useReducer, useState } from "react";
import { db } from "../firebase/config";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";

const initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'UPDATED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'READED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state;
    }
}

export const useFirestore = (col) => {

    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCancelled, setIsCancelled] = useState(false);


    // collection ref
    const colRef = collection(db, col);

    // only dispatch if not cancelled
    const dispatchIfNotCancelled = action => {
        if(!isCancelled) dispatch(action);
    }

    // add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            const addDocument = await addDoc(colRef, {...doc});
            dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT' , payload: addDocument })
            
        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message })
        }
    }

    // update document
    const updateDocument = async (id, updates) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            // Document to be updated ref
            const documentRef = doc(colRef, id);

            // Update document
            console.log('updateDocument', updates)
            const updatedDocument = await updateDoc(documentRef, updates);
            dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument });
            return updatedDocument; // Just in case
        } catch (error) {
            console.log('updateDocument', error)
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
        }
    }

    // read document (single time without listener)
    const getDocument = async (id) => {
        dispatch({ type: 'IS_PENDING' });

        try {
            // Document ref
            const documentRef = doc(colRef, id);
            const docSnap = await getDoc(documentRef);

            if(docSnap.exists()) {
                const doc = docSnap.data();
                dispatchIfNotCancelled({ type: 'READED_DOCUMENT', payload: doc });
                return doc;
            }


        } catch (error) {
            dispatchIfNotCancelled({ type: 'ERROR', payload: error.message });
        }
    }


    // Clean up
    useEffect(() => {
        return () => setIsCancelled(true);
    }, [])

    return { addDocument, updateDocument, getDocument, response }
}