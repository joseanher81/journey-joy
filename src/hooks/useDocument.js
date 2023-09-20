import { collection, doc, onSnapshot } from 'firebase/firestore';
import {db} from '../firebase/config';
import { useEffect, useState } from 'react';


export const useDocument = (col, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);

    // Realtime data for document
    useEffect(() => {
        try {
            const colRef = collection(db, col);
            const docRef = doc(colRef, id);
        
            const unsub = onSnapshot( docRef, (snapshot) => {
                if(snapshot.data()) {
                    setDocument({...snapshot.data(), id: snapshot.id})
                    setError(null);
                } else {
                    setError('Inexistent document');
                }
    
            })

            return () => unsub();

        } catch (error) {
            setError(error);
        }

    }, [col, id])

    // TODO ADD ERROR TREATMENT

    return {document, error}

}